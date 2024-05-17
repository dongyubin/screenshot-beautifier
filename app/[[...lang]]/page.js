import React from "react";
import Main from "@components/main";
import Hero from "@components/landingPage/Hero";
import Features from "@components/landingPage/Features";
import Pricing from "@components/landingPage/Pricing";
import Faqs from "@components/landingPage/Faqs";
import { getUserSubscriptionPlan } from "@lib/subscription";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { defaultLocale, getDictionary } from "@/lib/i18n";

// const page = async ({ params }) => {
export default async function page({ params: { lang },
}) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPro = false;

  if (user?.id) {
    try {
      const subscriptionData = await getUserSubscriptionPlan(user.id);
      isPro = subscriptionData.isPro;
    } catch (error) {
      // 可能需要在这里处理错误，比如记录日志
      console.error(error);
    }
  }


  let langName =
    lang && lang[0] && lang[0] !== "index" ? lang[0] : defaultLocale;

  const dict = await getDictionary(langName);

  console.log(langName);
  return (
    <div>
      <Main isPro={isPro} id="editor" />
      <Hero />
      <Features />
      <Pricing />
      <Faqs id="faqs" locale={dict.FAQ} langName={langName} />
    </div>
  );
};

// export default page;
