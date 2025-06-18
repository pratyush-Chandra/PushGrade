"use client";

import { motion, easeOut } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  }
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

export default function AnimationsPage() {
  const [showBounce, setShowBounce] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Framer Motion Animations</h1>
        <p className="text-lg text-muted-foreground">
          Examples of different animation patterns using Framer Motion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fade In Up Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Card>
            <CardHeader>
              <CardTitle>Fade In Up</CardTitle>
              <CardDescription>
                Component fades in and slides up from below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card demonstrates the basic fade-in and slide-up animation
                that's commonly used for page entrances.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scale In Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <Card>
            <CardHeader>
              <CardTitle>Scale In</CardTitle>
              <CardDescription>
                Component scales in from a smaller size
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This animation is great for drawing attention to important
                elements or modal dialogs.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Staggered List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Staggered Animation</CardTitle>
              <CardDescription>
                Multiple items animate in sequence with a delay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="p-3 bg-muted rounded-lg"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Bounce Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Interactive Animation</CardTitle>
              <CardDescription>
                Click the button to trigger a bounce animation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setShowBounce(!showBounce)}
                className="mb-4"
              >
                Toggle Bounce Animation
              </Button>
              
              {showBounce && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={bounceIn}
                  className="inline-block"
                >
                  <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                    🎉 Bounce Animation! 🎉
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Hover Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:col-span-2"
        >
          <Card className="cursor-pointer">
            <CardHeader>
              <CardTitle>Hover & Tap Animations</CardTitle>
              <CardDescription>
                Hover to scale up, tap to scale down
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card responds to hover and tap interactions with smooth
                scale animations. Try hovering over it or clicking!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Code Example */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Animation Code Example</CardTitle>
            <CardDescription>
              Here's how to implement the fade-in and slide-up animation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { motion, easeOut } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  Your content here
</motion.div>`}
            </pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 