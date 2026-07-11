import Image from "next/image";
import Banner from "@/components/Banner";
export default function Home() {
  return (
    <main>
      <Banner
        title="Write, Publish, Inspire"
        subtitle="Join thousands of creators who use StoryCanvas to share their ideas and connect with readers."
        primaryText="Start Writing"
        secondaryText="Learn More"
        badge="🔥 Trending"
        // backgroundImage="/images/hero-bg.jpg" // optional
      />
    </main>
  );
}
