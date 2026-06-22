import RedditOutreachTool from '@/components/RedditOutreachTool';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function IdeaValidatorPage() {
  return (
    <main>
      <Navbar />
      <RedditOutreachTool 
        defaultKeyword="find customers reddit"
        pageContext="idea-validator"
      />
      <Footer />
    </main>
  )
}
