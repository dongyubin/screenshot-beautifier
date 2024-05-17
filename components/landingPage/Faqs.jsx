import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ALL_FAQS } from "@/config/faqs";



const Faqs = ({id, locale, langName,}) => {
  const FAQS = ALL_FAQS[`FAQS_${langName.toUpperCase()}`];
  return (
    // <div
    //   className="container mx-auto px-5 py-10 flex flex-col items-center"
    //   id="faqs"
    // >
    //    <div className="flex flex-col text-center gap-4">
    //   <h2 class="mb-3">{locale.title}</h2>
    //   <p className="text-large text-default-500">{locale.description}</p>
    //   </div>
    //   <Accordion type="single" collapsible className="w-[100%] md:w-[50%]">
    //     <AccordionItem value="item-1">
    //       <AccordionTrigger className="text-start">
    //         Is Shotune Free?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         Yes! Shotune offers a free version with robust features.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-2">
    //       <AccordionTrigger className="text-start">
    //         Do I need an account to use Shotune?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         No accounts required for the free-tier. An account is only required
    //         for the Pro versions.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-3">
    //       <AccordionTrigger className="text-start">
    //         Does Shotune store or access my snaps on the server?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         No. Shotune operates locally, ensuring your privacy. We only store
    //         your images on our servers when you save a snap.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-4">
    //       <AccordionTrigger className="text-start">
    //         Is a credit card required to try Shotune Free?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         No credit card needed for the free version.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-5">
    //       <AccordionTrigger className="text-start">
    //         What payment methods do you support?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         Various payment options are available for our premium version.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-6">
    //       <AccordionTrigger className="text-start">
    //         Can I get help from a real person?
    //       </AccordionTrigger>
    //       <AccordionContent className="text-start">
    //         Absolutely! Our support team is here to assist you. You can reach
    //         out to us through out email shotune.com@gmail.com
    //       </AccordionContent>
    //     </AccordionItem>
    //   </Accordion>
    // </div>
      <div
      className="container mx-auto px-5 py-10 flex flex-col items-center"
      id={id}
    >
      <div className="flex flex-col text-center gap-4">
        <h2 className="text-center text-white">

            {locale.title}
        </h2>
        <p className="text-large text-default-500">{locale.description}</p>
      </div>
      <Accordion type="single" collapsible className="w-[100%] md:w-[50%]"
        items={FAQS}
        // selectionMode="multiple"
        // variant="splitted"
      >
        {FAQS?.map((item, index) => (
          <AccordionItem
            key={item.title}
            value={`item-${index}`}
            title={item.title}
          >
            <AccordionTrigger className="text-start">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-start">
            {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
