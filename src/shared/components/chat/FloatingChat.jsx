import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import {
  CloseButton,
  ChatTitle,
  ChatContainer,
  ChatHeader,
  Input,
  InputContainer,
  LoadingDots,
  Message,
  MessagesContainer,
  SendButton,
  FloatingButton,
} from "./FloatingChat-style";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Olá! Sou o assistente virtual da clínica. Como posso ajudar você hoje?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToGemini = async (userMessage) => {
    // Substitua pela sua chave de API real
    const apiKey = "AIzaSyAJ5qPTPJp6kFrTXq_NdcYWIo7EK6UETf0";

    if (!apiKey) {
      return "Erro: Chave da API do Gemini não configurada.";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
Você é um assistente clínico odontológico. Receberá uma descrição rápida do paciente e deve gerar um relatório clínico **detalhado, organizado e conciso**, fácil de ler.  

O relatório deve conter 3 seções:

1) RESUMO: parágrafo curto com queixas principais e área de atenção.
2) OBSERVAÇÕES CLÍNICAS: liste os sinais mais importantes, cada item em linha separada.
3) RECOMENDAÇÕES: liste os procedimentos ou orientações essenciais, em linhas curtas.

Regras importantes:
- Mantenha o relatório detalhado, mas não muito longo.
- Evite repetições, excesso de texto ou informações secundárias.
- Nunca use JSON, colchetes, aspas ou asteriscos (*).
- Organize o texto com títulos claros e espaçamento entre seções.
- Se houver informação incompleta, indique o que deve ser avaliado.

Descrição do paciente: ${userMessage}
`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 503) {
          return "O servidor do Gemini está temporariamente indisponível. Tente novamente em alguns instantes.";
        }
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text;

      if (!botResponse) {
        return "Desculpe, não consegui gerar o relatório no momento.";
      }

      return botResponse;
    } catch (error) {
      console.error("Erro ao chamar API do Gemini:", error);
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    // Envia para o Gemini e recebe resposta
    const botResponse = await sendMessageToGemini(userMessage);

    // Adiciona resposta do bot
    setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    setIsLoading(false);
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </FloatingButton>

      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            <ChatTitle>Chat com IA</ChatTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((message, index) => (
              <Message key={index} $isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
            {isLoading && (
              <Message $isUser={false}>
                <LoadingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </LoadingDots>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <SendButton
              type="submit"
              disabled={isLoading || !inputValue.trim()}
            >
              <FaPaperPlane />
            </SendButton>
          </InputContainer>
        </ChatContainer>
      )}
    </>
  );
};

export default FloatingChat;
