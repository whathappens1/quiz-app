"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const MotionCheckIcon = motion(CheckIcon)

// Properly extend the Radix UI RadioGroup.Item types
interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  className?: string
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator asChild>
        <motion.div 
          className="flex items-center  justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30
            }
          }}
          exit={{ 
            scale: 0, 
            opacity: 0,
            transition: {
              duration: 0.2
            }
          }}
        >
          <MotionCheckIcon 
            className="h-3 w-3 "
         
            initial={{ scale: 1 }}
            animate={{ 
              scale: 1,
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
          />
        </motion.div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }