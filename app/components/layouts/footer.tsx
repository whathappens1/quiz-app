"use client";
import { motion } from "framer-motion";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-auto py-6"
    >
      <p className="text-muted-foreground text-sm text-center">
        كل الحقوق محفوظة لـ{" "}
        <span className="text-black dark:text-white font-bold">تميم السهلي</span> © {year}.
      </p>
    </motion.footer>
  );
}

export default Footer;
