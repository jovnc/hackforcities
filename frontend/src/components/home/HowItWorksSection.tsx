import { FileText, Sparkles, BookOpen } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="mx-auto bg-primary/5 px-20 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Get started with SLSmart in three simple steps
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">1. Teachers upload file</h3>
          <p className="text-gray-600">
            Simple to use, just upload your file and let SLSmart do the rest
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">2. Find your notes</h3>
          <p className="text-gray-600">Search for the notes you need</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">3. Generate</h3>
          <p className="text-gray-600">
            Use our in-house AI and RAG chatbot to generate summaries, questions and chat with your
            notes
          </p>
        </div>
      </div>
    </section>
  );
}
