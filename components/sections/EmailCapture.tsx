import DrawnRule from "@/components/ui/DrawnRule";
import NewsletterInput from "@/components/ui/NewsletterInput";

export default function EmailCapture() {
  return (
    <section className="bg-ink px-6 py-32 text-paper md:py-40">
      <div className="mx-auto max-w-md text-center">
        <h2 className="display-lg">Quiet permanence takes time.</h2>
        <p className="mt-6 text-gray-3">
          Leave an address and be first through the door.
        </p>
        <div className="mt-10">
          <DrawnRule />
        </div>
        <div className="mt-10 flex justify-center">
          <NewsletterInput />
        </div>
      </div>
    </section>
  );
}
