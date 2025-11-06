"use client";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";
import MobileInput from "@/components/ui/mobile-input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangePhone = (value: string) => {
    // value is in format: "<dial> <phone>"
    const parts = value.split(" ");
    if (parts.length >= 2) {
      const dial = parts[0] ?? "";
      const phoneNumber = parts.slice(1).join("").trim();
      setPhone(`${dial.replace(/\s+/g, "")}${phoneNumber}`);
    } else if (value.trim()) {
      setPhone(value.replace(/\s+/g, ""));
    } else {
      setPhone("");
    }
  };

  return (
    <main className="container mx-auto flex-1 h-full p-4 flex flex-col md:flex-row gap-8">
      <div className="flex-2 flex flex-col gap-4 h-full my-auto">
        <div>
          <MobileInput onChange={onChangePhone} />
        </div>
        <div>
          <Textarea
            placeholder="Your message..."
            className="min-h-32"
            onChange={onChangeText}
          />
        </div>
        <CopyButton
          className="w-full"
          disabled={!phone || !text}
          content={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
        />
      </div>
      <div className="flex-1 my-auto">
        <Accordion type="single" collapsible defaultValue="how">
          <AccordionItem value="how">
            <AccordionTrigger>How to use</AccordionTrigger>
            <AccordionContent>
              To generate a WhatsApp link, enter the recipient's mobile number
              using the country code selector and input field. Then, type your
              desired message in the message box. Finally, click the "Copy"
              button to copy the generated WhatsApp link to your clipboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="what">
            <AccordionTrigger>What is Whatsapp Link Generator</AccordionTrigger>
            <AccordionContent>
              Whatsapp Link Generator is a tool that helps you create WhatsApp
              links easily. These links can be used to start a chat with a
              specific phone number and pre-filled message, making it convenient
              for sharing contact information or initiating conversations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="difference">
            <AccordionTrigger>
              What makes this tool different from others?
            </AccordionTrigger>
            <AccordionContent>
              Whatsapp Link Generator is designed to be a simple and free tool
              that anyone can use without the need for complex setups or
              subscriptions. Its user-friendly interface allows users to quickly
              generate WhatsApp links without any hassle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
