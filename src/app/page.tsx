import Banner from "@/components/homePage/Banner";
import BrowseInterests from "@/components/homePage/BrowseInterests";
import Stats from "@/components/homePage/Stats";
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
      <Stats></Stats>
      <BrowseInterests></BrowseInterests>
    </main>
  );
}
