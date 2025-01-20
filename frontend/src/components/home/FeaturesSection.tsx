import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Speech, Upload, Paperclip } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex flex-col gap-8 px-20 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          To upgrade your SLS experience, we offer a range of powerful features
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Upload className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Easy Upload</CardTitle>
            <CardDescription>Intuitive interface for teachers to upload notes</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Speech className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Chat</CardTitle>
            <CardDescription>Students can chat with your PDF notes</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Paperclip className="mb-3 h-8 w-8 text-primary" />
            <CardTitle>Generate Questions</CardTitle>
            <CardDescription>
              Students can generate questions based on your uploaded notes
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
