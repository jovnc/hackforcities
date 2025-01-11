'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { api } from '@/lib/axios';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export default function ChatWithNotes({ id }: { id: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<{ message: string }>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: { message: string }) => {
    if (data.message.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: data.message,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    form.reset();

    try {
      const response = await api.post('/chat', { message: data.message, id: id });
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.data.message,
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      toast('An error occurred while sending the message');
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto h-[600px] w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Chat with the Notes</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[450px] px-4 py-8">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-4 flex items-start ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}
              >
                <Avatar className="h-8 w-8">
                  {m.role === 'user' ? (
                    <>
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder-bot.jpg" alt="Bot" />
                      <AvatarFallback>B</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`mx-2 rounded-lg p-3 ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex items-start">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-bot.jpg" alt="Bot" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="mx-2 rounded-lg bg-muted p-3">Bot is typing...</div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full space-x-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input {...field} placeholder="Ask your questions..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
