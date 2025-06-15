<template>
  <section class="blog-detail-section" v-if="blog">
    <div class="blog-detail-card">
      <div class="blog-detail-image-block">
        <img :src="blog.image" :alt="blog.title" class="blog-detail-image" />
        <span class="blog-badge" :class="blog.badgeClass">{{ blog.badge }}</span>
      </div>
      <div class="blog-detail-content">
        <h1 class="blog-detail-title">{{ blog.title }}</h1>
        <div class="blog-detail-body" v-html="blog.content"></div>
        <router-link to="/blogs" class="back-link">&larr; Back to Blogs</router-link>
      </div>
    </div>
  </section>
  <section v-else class="blog-detail-section">
    <div class="blog-detail-card">
      <h2>Blog not found</h2>
      <router-link to="/blogs" class="back-link">&larr; Back to Blogs</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlogDetail',
  data() {
    return {
      blog: null,
    };
  },
  created() {
    // Get blog data from Blogs.vue (simulate shared store)
    const blogs = [
      {
        id: 1,
        title: 'Having a website for your business is not a luxury but a necessity',
        summary: 'If you’re still on the fence about creating a website for your small business, it’s time to reconsider. In today’s digital age, having an online presence is essential.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        badge: 'WEBSITE',
        badgeClass: 'badge-website',
        content: `
          <h2>Why Every Business Needs a Website in 2025</h2>
          <p>In today’s hyper-connected world, your website is your digital storefront. It’s the first impression you make on potential customers, partners, and even future employees. If you’re still on the fence about creating a website for your small business, it’s time to reconsider. Here’s why:</p>
          <ul>
            <li><strong>Credibility & Trust:</strong> 84% of consumers believe a business with a website is more credible than one with only social media. Your website is proof you’re real, professional, and invested in your brand.</li>
            <li><strong>24/7 Accessibility:</strong> Your website never sleeps. It works for you around the clock, answering questions, showcasing your work, and capturing leads—even while you rest.</li>
            <li><strong>Showcase Your Brand:</strong> A website is the only place you control 100%. You decide the story, the visuals, and the experience. It’s your chance to stand out and show what makes you unique.</li>
            <li><strong>Marketing Hub:</strong> All your marketing—social, ads, email—should point to your website. It’s where you convert visitors into customers.</li>
            <li><strong>Compete with Bigger Brands:</strong> A beautiful, functional website levels the playing field. Small businesses can look just as professional as the giants.</li>
          </ul>
          <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ffb300;color:#ffb300;margin:2rem 0;">“Your website is the only employee that works 24/7, never asks for a raise, and always represents your brand.”</blockquote>
          <h3>What Makes a Great Business Website?</h3>
          <ul>
            <li>Clear, compelling homepage</li>
            <li>Easy navigation</li>
            <li>Mobile-friendly design</li>
            <li>Fast loading speed</li>
            <li>Contact info and calls to action</li>
            <li>Authentic images and testimonials</li>
          </ul>
          <h3>How to Get Started</h3>
          <p>Start by defining your goals. Do you want to sell products, showcase your portfolio, or simply provide information? Choose a platform that fits your needs—WordPress, Shopify, or a custom solution. Invest in professional design and copywriting. Remember, your website should reflect your brand’s personality and values.</p>
          <h3>Common Mistakes to Avoid</h3>
          <ul>
            <li>Ignoring mobile users—over 60% of traffic is mobile.</li>
            <li>Slow loading times—optimize images and use good hosting.</li>
            <li>Unclear calls to action—tell visitors what to do next.</li>
            <li>Outdated content—keep your site fresh and relevant.</li>
          </ul>
          <h3>Final Thoughts</h3>
          <p>Don’t let your business get left behind. Invest in a professional website and watch your business grow. If you need help, our team specializes in building beautiful, high-converting sites for brands like yours. The future is digital—make sure your business is ready!</p>
        `,
      },
      {
        id: 2,
        title: 'Why Your Business Needs a Review Section: A Lesson from a Young Mother',
        summary: 'Getting a good review can be a game changer for your business. Learn why customer feedback is crucial and how to leverage it.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        badge: 'STORY',
        badgeClass: 'badge-story',
        content: `
          <h2>The Impact of Customer Reviews on Business Success</h2>
          <p>Customer reviews are powerful. They build trust and influence buying decisions. Adding a review section to your website can help you gather feedback, improve your services, and attract new customers. Don’t underestimate the power of a good testimonial!</p>
          <h3>Why Reviews Matter</h3>
          <ul>
            <li><strong>Build Trust:</strong> Positive reviews increase trust in your brand. They serve as social proof that you deliver on your promises.</li>
            <li><strong>Improve SEO:</strong> Fresh, relevant reviews can boost your visibility on search engines, driving more traffic to your site.</li>
            <li><strong>Gain Insights:</strong> Reviews provide valuable insights into what your customers love or what needs improvement.</li>
            <li><strong>Engage with Customers:</strong> Responding to reviews shows you value customer feedback and are committed to improving.</li>
          </ul>
          <h3>How to Encourage More Reviews</h3>
          <ul>
            <li>Make it easy—add review forms or links on your website and receipts.</li>
            <li>Follow up with customers after a purchase and politely ask for feedback.</li>
            <li>Showcase your best reviews on your homepage and social media.</li>
            <li>Respond to every review, positive or negative, to show you care.</li>
          </ul>
          <h3>Real-World Example</h3>
          <p>When Mrs. Ebele, a young mother, was searching for a school for her child, she didn’t start with Google ads or billboards. She started with reviews—real stories from other parents. This is the new normal: 93% of consumers say online reviews impact their buying decisions. Make reviews a core part of your business strategy. They’re free, powerful, and authentic marketing.</p>
        `,
      },
      {
        id: 3,
        title: 'Is Branding Really Necessary?',
        summary: 'You probably have been told that it will help you make more sales and even dignify your business and make you stand out. Here’s why branding matters.',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
        badge: 'HELPFUL TIPS',
        badgeClass: 'badge-tips',
        content: `
          <h2>The Essential Guide to Branding for Small Businesses</h2>
          <p>Branding is more than just a logo. It’s the perception people have of your business. Strong branding helps you stand out, build loyalty, and increase your value in the marketplace. Invest in your brand and watch your business grow.</p>
          <h3>Key Elements of a Strong Brand</h3>
          <ul>
            <li><strong>Unique Value Proposition:</strong> What makes your business different and better?</li>
            <li><strong>Consistent Messaging:</strong> Your brand message should be consistent across all channels.</li>
            <li><strong>Visual Identity:</strong> This includes your logo, color palette, typography, and imagery.</li>
            <li><strong>Brand Voice:</strong> The tone and style of your communication.</li>
          </ul>
          <h3>How to Build a Memorable Brand</h3>
          <ul>
            <li>Define your mission, vision, and values. What do you stand for?</li>
            <li>Design a visual identity that reflects your personality and appeals to your audience.</li>
            <li>Be consistent in every interaction—online and offline.</li>
            <li>Tell your story. People connect with stories, not products.</li>
            <li>Engage with your audience on social media and in your community.</li>
          </ul>
          <h3>Branding Mistakes to Avoid</h3>
          <ul>
            <li>Copying competitors—be original and authentic.</li>
            <li>Inconsistent visuals or messaging.</li>
            <li>Neglecting your online presence.</li>
          </ul>
          <p>Developing a strong brand takes time and consistency. Ensure all aspects of your business reflect your brand values and message. Branding is an investment, not an expense. Start today and watch your business transform.</p>
        `,
      },
      {
        id: 4,
        title: 'The Psychology of Color in Graphic Design',
        summary: 'Colors influence perception and emotions. Discover how to use color psychology to your advantage in branding and design.',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        badge: 'DESIGN',
        badgeClass: 'badge-design',
        content: `
          <h2>Understanding Color Psychology in Marketing</h2>
          <p>Colors evoke emotions and influence decisions. In graphic design, choosing the right color palette can make your brand more memorable and appealing. Learn how to use color psychology to your advantage.</p>
          <h3>Color Associations</h3>
          <ul>
            <li><strong>Red:</strong> Passion, energy, danger</li>
            <li><strong>Blue:</strong> Trust, calm, professionalism</li>
            <li><strong>Green:</strong> Growth, health, tranquility</li>
            <li><strong>Yellow:</strong> Optimism, clarity, warmth</li>
            <li><strong>Purple:</strong> Luxury, creativity, mystery</li>
            <li><strong>Black:</strong> Elegance, power, sophistication</li>
            <li><strong>White:</strong> Purity, simplicity, cleanliness</li>
          </ul>
          <p>Choose colors that align with the emotions you want your brand to evoke. Consider cultural differences in color perception when targeting global audiences.</p>
        `,
      },
      {
        id: 5,
        title: 'How to Build a Memorable Brand Identity',
        summary: 'A strong brand identity is more than a logo. Learn the key elements that make a brand unforgettable.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        badge: 'BRANDING',
        badgeClass: 'badge-branding',
        content: `
          <h2>Building a Brand Identity That Stands Out</h2>
          <p>Brand identity is the collection of all elements that a company creates to portray the right image to its consumer. This includes your logo, colors, typography, and messaging. Consistency is key to building a memorable brand.</p>
          <h3>Steps to Create a Strong Brand Identity</h3>
          <ul>
            <li><strong>Define Your Brand:</strong> What are your brand’s values, mission, and vision?</li>
            <li><strong>Research Your Audience:</strong> Understand who your customers are and what they want.</li>
            <li><strong>Design Your Visual Identity:</strong> Create a logo, choose your colors, and select typography that reflects your brand.</li>
            <li><strong>Develop Your Brand Voice:</strong> Decide how your brand will communicate with the audience.</li>
            <li><strong>Be Consistent:</strong> Ensure all brand materials and communications are consistent in style and message.</li>
          </ul>
          <p>A strong brand identity helps you connect with your audience on a deeper level. It fosters loyalty and makes your brand more recognizable.</p>
        `,
      },
      {
        id: 6,
        title: 'Web Design Trends for 2025',
        summary: 'Stay ahead of the curve with these top web design trends that will define the digital landscape in 2025.',
        image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
        badge: 'TRENDS',
        badgeClass: 'badge-trends',
        content: `
          <h2>Top Web Design Trends to Watch in 2025</h2>
          <p>Web design is always evolving. In 2025, expect to see more bold colors, interactive elements, and mobile-first designs. Stay updated to keep your website looking fresh and engaging.</p>
          <h3>Predicted Trends</h3>
          <ul>
            <li><strong>Dark Mode Designs:</strong> Dark backgrounds with light text are easier on the eyes and save battery life on mobile devices.</li>
            <li><strong>Minimalism:</strong> Less is more. Simple, clean designs with plenty of white space will be popular.</li>
            <li><strong>Asymmetrical Layouts:</strong> Breaking the grid with unexpected, asymmetrical layouts will create more dynamic and interesting websites.</li>
            <li><strong>Micro-animations:</strong> Small animations that occur when a user interacts with a website element can provide feedback and guide actions.</li>
            <li><strong>Voice User Interface (VUI):</strong> With the rise of smart speakers and voice assistants, designing for voice will become essential.</li>
          </ul>
          <p>To stay competitive, ensure your website is not only up-to-date with the latest trends but also optimized for performance and user experience.</p>
        `,
      },
      {
        id: 7,
        title: 'The Importance of Consistency in Branding',
        summary: 'Consistency builds trust and recognition. Here’s how to keep your brand message and visuals aligned everywhere.',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
        badge: 'BRANDING',
        badgeClass: 'badge-branding',
        content: `
          <h2>Why Consistency is Key in Branding</h2>
          <p>Consistency builds trust and recognition. Here’s how to keep your brand message and visuals aligned everywhere.</p>
          <h3>Tips for Maintaining Consistency</h3>
          <ul>
            <li><strong>Brand Guidelines:</strong> Create a comprehensive guide that covers your brand’s visual and messaging elements.</li>
            <li><strong>Regular Audits:</strong> Periodically review your marketing materials, website, and social media to ensure consistency.</li>
            <li><strong>Employee Training:</strong> Educate your team about your brand values, messaging, and visual identity.</li>
            <li><strong>Feedback Mechanism:</strong> Have a system in place to gather feedback on your branding efforts and make adjustments as needed.</li>
          </ul>
          <p>Remember, your brand is what people say about you when you're not in the room. Make sure it's a positive and consistent message.</p>
        `,
      },
      {
        id: 8,
        title: 'Graphic Design Basics for Small Businesses',
        summary: 'You don’t need to be a designer to create great graphics. Learn the basics to make your business look professional.',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        badge: 'GRAPHIC DESIGN',
        badgeClass: 'badge-design',
        content: `
          <h2>Graphic Design 101: A Guide for Small Business Owners</h2>
          <p>You don’t need to be a designer to create great graphics. Learn the basics to make your business look professional.</p>
          <h3>Essential Graphic Design Tips</h3>
          <ul>
            <li><strong>Keep It Simple:</strong> Don’t overcrowd your designs. Use space effectively to create a clean, professional look.</li>
            <li><strong>Be Consistent:</strong> Use the same or similar colors, fonts, and styles across all your graphics.</li>
            <li><strong>Use High-Quality Images:</strong> Always use high-resolution images that are relevant to your content.</li>
            <li><strong>Limit Fonts:</strong> Use no more than two or three different fonts in your designs to keep them cohesive.</li>
            <li><strong>Color Contrast:</strong> Ensure there is a good contrast between your background and text colors to make your content readable.</li>
          </ul>
          <p>Good design doesn’t have to be complicated. Use simple layouts, clear fonts, and consistent colors to make your business look professional and trustworthy.</p>
        `,
      },
      {
        id: 9,
        title: 'How to Write Compelling Website Copy',
        summary: 'Your website copy can make or break conversions. Discover tips for writing copy that sells.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        badge: 'WEBSITE',
        badgeClass: 'badge-website',
        content: `
          <h2>Writing Website Copy That Sells: A How-To Guide</h2>
          <p>Your website copy can make or break conversions. Discover tips for writing copy that sells.</p>
          <h3>Key Elements of Persuasive Website Copy</h3>
          <ul>
            <li><strong>Clear Value Proposition:</strong> Clearly explain what you offer and why it’s valuable to the customer.</li>
            <li><strong>Engaging Headlines:</strong> Use attention-grabbing headlines that make visitors want to read more.</li>
            <li><strong>Benefit-Oriented Language:</strong> Focus on the benefits of your product or service, not just the features.</li>
            <li><strong>Strong Call to Action:</strong> Tell visitors exactly what you want them to do next, whether it’s signing up, making a purchase, or contacting you.</li>
            <li><strong>Trust Signals:</strong> Include testimonials, reviews, and trust badges to build credibility.</li>
          </ul>
          <p>Great website copy is clear, concise, and focused on the customer. Use strong headlines, highlight benefits, and include calls to action to boost conversions.</p>
        `,
      },
      {
        id: 10,
        title: 'Logo Design: What Makes a Logo Great?',
        summary: 'A great logo is simple, memorable, and versatile. Learn the principles behind effective logo design.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        badge: 'LOGO',
        badgeClass: 'badge-logo',
        content: `
          <h2>The Art of Logo Design: Creating a Memorable Brand Mark</h2>
          <p>A great logo is simple, memorable, and versatile. Learn the principles behind effective logo design.</p>
          <h3>Characteristics of a Great Logo</h3>
          <ul>
            <li><strong>Simple:</strong> A great logo is easily recognizable and memorable.</li>
            <li><strong>Relevant:</strong> It should be appropriate for the business or industry it represents.</li>
            <li><strong>Timeless:</strong> A great logo stands the test of time and doesn’t follow trends.</li>
            <li><strong>Versatile:</strong> It works across different mediums and applications.</li>
            <li><strong>Unique:</strong> A great logo is distinctive and sets the brand apart from competitors.</li>
          </ul>
          <p>Invest in a professional logo design that effectively represents your brand. Your logo is often the first thing people will see, make it count!</p>
        `,
      },
    ];
    const id = parseInt(this.$route.params.id);
    this.blog = blogs.find(b => b.id === id) || null;
  },
};
</script>

<style scoped>
.blog-detail-section {
  min-height: 70vh;
  padding: 3rem 2vw 2rem 2vw;
  background: #101010;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-detail-card {
  background: #181818;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(255,183,0,0.08);
  max-width: 700px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 2.5rem;
}
.blog-detail-image-block {
  position: relative;
  width: 100%;
  height: 320px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.blog-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.blog-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  background: #ffb300;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.4rem 1.1rem;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px #ffb30033;
  letter-spacing: 1px;
  z-index: 2;
}
.badge-website { background: #ffb300; }
.badge-story { background: #ff6f61; }
.badge-tips { background: #ff6f61; }
.badge-design { background: #00bcd4; }
.badge-branding { background: #222; color: #ffb300; }
.badge-trends { background: #4caf50; }
.badge-logo { background: #673ab7; }
.blog-detail-content {
  padding: 2.2rem 2rem 0 2rem;
  width: 100%;
}
.blog-detail-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #ffb300;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', Arial, sans-serif;
}
.blog-detail-body {
  color: #e0e0e0;
  font-size: 1.15rem;
  margin-bottom: 2.2rem;
  line-height: 1.7;
}
.back-link {
  color: #ff1744;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  margin-top: 1.2rem;
  display: inline-block;
  transition: color 0.2s;
}
.back-link:hover {
  color: #ffb300;
}
</style>
