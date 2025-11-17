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
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = "AIzaSyAJ5qPTPJp6kFrTXq_NdcYWIo7EK6UETf0";

    if (!apiKey) {
      return "Erro: Chave da API do Gemini não configurada. Por favor, configure a variável VITE_GEMINI_API_KEY no arquivo .env";
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
Você é um assistente clínico para ortodontista. Receberá uma **descrição rápida do paciente**. A partir disso, gere automaticamente:

1) Resumo técnico (para o dentista)  
2) Observações clínicas detalhadas (cáries, tártaro, fraturas, mobilidade, lesões gengivais)  
3) Recomendações de acompanhamento (sem dar diagnóstico direto ao paciente)  

Sempre entregue o resultado em JSON estruturado:

{
  "summary": "...",
  "observations": ["...", "..."],
  "recommendations": ["...", "..."]
}

Descrição rápida do paciente: ${userMessage}
`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text;

      if (!botResponse) {
        throw new Error("Resposta inválida da API");
      }

      return botResponse;
    } catch (error) {
      console.error("Erro ao chamar API do Gemini:", error);
      return "Desculpe, estou com dificuldades para processar sua mensagem no momento. Por favor, tente novamente em instantes.";
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
