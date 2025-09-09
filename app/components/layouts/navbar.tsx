"use client";
import Link from "next/link";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full border-b h-14 fixed bg-background/70 backdrop-blur-md z-50 -mb-16"
    >
      <div
        className="flex justify-center items-center h-full"
      >
        <Link href={"/"}>
          <div className="text-lg text-center font-bold">منصة نواة</div>
        </Link>
      </div>
    </motion.header>
  );
}

export default Navbar;
