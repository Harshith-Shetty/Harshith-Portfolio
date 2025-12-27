import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Code, 
  Database, 
  Server, 
  Send,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";
import { useExperiences, useProjects, useSkills, useContact } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link as ScrollLink } from "react-scroll";

// --- SECTIONS ---

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 mesh-gradient opacity-20 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-primary font-medium text-xl tracking-wide">Hello, I'm</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-glow">
                Harshith<br/>Shetty
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
                A Software Engineer specializing in FinTech, Data Engineering, and Full Stack Development.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <ScrollLink to="contact" smooth={true} offset={-100} className="cursor-pointer">
                  Contact Me
                </ScrollLink>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg gap-2" asChild>
                <a href="https://github.com/Harshith-Shetty" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="h-12 w-12 p-0 rounded-full border border-border" asChild>
                <a href="https://linkedin.com/in/harshithdshetty" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Abstract visual representation of code/data */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-md md:max-w-none relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl absolute inset-0 -z-10" />
            <div className="relative z-10 grid grid-cols-2 gap-4">
               <Card className="bg-card/50 backdrop-blur border-primary/20 transform translate-y-8">
                 <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                   <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                     <Database className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="font-bold">Data Engineering</h3>
                     <p className="text-sm text-muted-foreground mt-1">Kafka, Spark, Big Data</p>
                   </div>
                 </CardContent>
               </Card>
               <Card className="bg-card/50 backdrop-blur border-purple-500/20">
                 <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                   <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                     <Code className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="font-bold">Full Stack</h3>
                     <p className="text-sm text-muted-foreground mt-1">Angular, React, .NET</p>
                   </div>
                 </CardContent>
               </Card>
               <Card className="bg-card/50 backdrop-blur border-emerald-500/20 col-span-2 transform -translate-y-4 md:mx-12">
                 <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                   <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                     <Server className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="font-bold">Backend Systems</h3>
                     <p className="text-sm text-muted-foreground mt-1">Microservices, APIs, Cloud</p>
                   </div>
                 </CardContent>
               </Card>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce hidden md:block"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About Me" subtitle="Who I Am" />
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p className="mb-6">
            I am a passionate <span className="text-primary font-medium">Software Engineer</span> with a robust background in building scalable applications and data pipelines. With deep expertise in the <span className="text-foreground font-medium">FinTech</span> domain, I understand the critical importance of accuracy, security, and performance.
          </p>
          <p className="mb-6">
            My technical journey spans across the full stack. On the backend, I architect robust systems using <span className="text-foreground font-medium">.NET</span> and modern cloud technologies. In the world of data, I engineer high-throughput pipelines leveraging <span className="text-foreground font-medium">Apache Kafka</span> and <span className="text-foreground font-medium">Spark</span> to process massive datasets in real-time.
          </p>
          <p>
            When I'm not coding, I'm solving complex algorithmic problems on LeetCode or exploring the latest trends in distributed systems architecture. I thrive in collaborative environments where I can both learn from others and mentor peers.
          </p>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const { data: experiences, isLoading } = useExperiences();

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Professional Journey" subtitle="Experience" />

        <div className="relative border-l border-primary/20 ml-3 md:ml-6 space-y-12">
          {isLoading ? (
             <div className="pl-8 md:pl-12 space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-40 w-full bg-card animate-pulse rounded-xl" />
               ))}
             </div>
          ) : (
            experiences?.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] md:-left-[9px] top-0 w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary ring-4 ring-background" />
                
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                  <span className="font-mono text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-lg text-muted-foreground font-medium mb-4">{exp.company}</div>
                
                <Card className="border-none shadow-sm bg-card hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Featured Work" subtitle="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl" />)
          ) : (
            projects?.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start gap-2">
                      <span className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</span>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between gap-6">
                    <CardDescription className="text-base text-foreground/80">
                      {project.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const { data: skills, isLoading } = useSkills();

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Technical Arsenal" subtitle="Skills" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-card animate-pulse rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory || {}).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-card border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-primary">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="px-3 py-1.5 bg-background rounded-md border border-border text-sm font-medium hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const mutation = useContact();
  
  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Get In Touch" subtitle="Contact" className="text-center items-center flex flex-col" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card border-border shadow-2xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="bg-background min-h-[150px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                  >
                    {mutation.isPending ? "Sending..." : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Harshith Shetty. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
