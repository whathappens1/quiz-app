"use client";
import ScrollToTop from "react-scroll-up";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  return (
    <ScrollToTop showUnder={160} style={{"zIndex": 40, "bottom": "120px !important", "right": "18px !important"}}>
      <Button size={"icon"} variant={"secondary"} className="rounded-full" >
        <ArrowUp className="w-6 h-6" color="#000" strokeWidth={2.5} />
      </Button>
    </ScrollToTop>
  );
}
