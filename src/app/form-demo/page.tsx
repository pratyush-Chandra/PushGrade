"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  preferredTechnologies: z.string().min(1, "At least one technology required"),
});

type FormData = z.infer<typeof formSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut
    }
  }
};

const successVariants = {
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

export default function FormDemoPage() {
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experienceLevel: "beginner",
    },
  });

  const onSubmit = (data: FormData) => {
    setSubmitted(data);
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card>
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle>User Registration Form</CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription>
                Example form using React Hook Form, Zod, and Shadcn/ui components
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <motion.p 
                    className="text-sm text-red-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <motion.p 
                    className="text-sm text-red-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <motion.p 
                    className="text-sm text-red-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={undefined}
                  onValueChange={(value) => setValue("experienceLevel", value as FormData["experienceLevel"])}
                  defaultValue="beginner"
                >
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experienceLevel && (
                  <motion.p 
                    className="text-sm text-red-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.experienceLevel.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="preferredTechnologies">Preferred Technologies (comma separated)</Label>
                <Input
                  id="preferredTechnologies"
                  placeholder="e.g. javascript, react, nodejs"
                  {...register("preferredTechnologies")}
                />
                {errors.preferredTechnologies && (
                  <motion.p 
                    className="text-sm text-red-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.preferredTechnologies.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </motion.form>
            {submitted && (
              <motion.div 
                className="mt-6 p-4 border rounded-lg bg-green-50"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-semibold mb-2">Form Submitted!</h3>
                <div className="space-y-1">
                  <div>
                    <Badge variant="default">First Name</Badge>: {submitted.firstName}
                  </div>
                  <div>
                    <Badge variant="default">Last Name</Badge>: {submitted.lastName}
                  </div>
                  <div>
                    <Badge variant="default">Email</Badge>: {submitted.email}
                  </div>
                  <div>
                    <Badge variant="default">Experience</Badge>: {submitted.experienceLevel}
                  </div>
                  <div>
                    <Badge variant="default">Technologies</Badge>: {submitted.preferredTechnologies}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 