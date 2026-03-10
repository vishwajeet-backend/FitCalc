import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const BlogArticlePage = () => {
  const { slug } = useParams();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Sample article data (in production, this would be fetched based on slug)
  const article = {
    title: 'Insights about my personal and work life, and the in-betweens',
    date: 'August 13, 2021',
    category: 'Fitness',
    heroImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=445&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: "Design comps, layouts, wireframes - will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever.\n\nNot so fast, I would say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.\n\nThe toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread?"
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=490&fit=crop'
      },
      {
        type: 'paragraph',
        text: "The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread? Not so fast, I would say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.\n\nDesign comps, layouts, wireframes - will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever."
      },
      {
        type: 'blockquote',
        text: "Design comps, layouts, wireframes - will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever."
      },
      {
        type: 'paragraph',
        text: "Design comps, layouts, wireframes - will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever.\n\nThe toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread? Not so fast, I would say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.\n\nNot so fast, I would say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.\n\nDesign comps, layouts, wireframes - will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever."
      }
    ]
  };

  // Related posts data
  const relatedPosts = [
    {
      id: 'programming-cartoons',
      title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
      description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.',
      date: 'August 13, 2021',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=502&h=210&fit=crop'
    },
    {
      id: 'design-workflow',
      title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
      description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.',
      date: 'August 13, 2021',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=502&h=210&fit=crop'
    },
    {
      id: 'ux-patterns',
      title: '10 Hilarious Cartoons That Depict Real-Life Problems of Programmers',
      description: 'Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.',
      date: 'August 13, 2021',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=502&h=210&fit=crop'
    }
  ];

  const styles = {
    pageContainer: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      position: 'relative'
    },
    headerBanner: {
      width: '100%',
      height: '80px',
      backgroundColor: '#DCE6FA',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1001
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '1800px',
      padding: '6px 42px'
    },
    logo: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '36px',
      fontWeight: 500,
      color: '#161E24',
      textDecoration: 'none',
      lineHeight: 'normal'
    },
    nav: {
      display: 'flex',
      gap: '24px',
      alignItems: 'center'
    },
    navLink: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '14px',
      color: '#000000',
      textDecoration: 'none',
      padding: '15px 10px',
      lineHeight: '22.4px'
    },
    heroSection: {
      width: '1376px',
      height: '445px',
      margin: '70px auto 0',
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px'
    },
    heroTitle: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '48px',
      fontWeight: 600,
      color: '#FFFFFF',
      textAlign: 'center',
      maxWidth: '970px',
      lineHeight: 'normal'
    },
    contentWrapper: {
      width: '100%',
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '80px 32px 100px'
    },
    articleContainer: {
      width: '1197px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '52px'
    },
    articleParagraph: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '20px',
      color: '#232E52',
      lineHeight: '1.5',
      whiteSpace: 'pre-line'
    },
    contentImage: {
      width: '100%',
      height: '490px',
      borderRadius: '10px',
      objectFit: 'cover'
    },
    blockquote: {
      backgroundColor: '#EBF2FE',
      borderRadius: '8px',
      padding: '50px',
      position: 'relative',
      boxShadow: 'inset 0px 4px 0px 0px #1D54C0'
    },
    blockquoteText: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '22px',
      color: '#232E52',
      lineHeight: '1.5',
      maxWidth: '680px'
    },
    relatedSection: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      marginTop: '80px'
    },
    relatedHeading: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '36px',
      fontWeight: 700,
      color: '#232E52',
      lineHeight: 'normal',
      marginBottom: 0
    },
    relatedPostsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '60px'
    },
    postCard: {
      display: 'flex',
      gap: '60px',
      alignItems: 'center',
      textDecoration: 'none'
    },
    postLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '610px'
    },
    postTop: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    tagContainer: {
      display: 'flex'
    },
    categoryTag: {
      backgroundColor: '#EBF2FE',
      padding: '8px 12px 10px',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px'
    },
    categoryTagText: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '13px',
      fontWeight: 600,
      color: '#232E52',
      textTransform: 'uppercase',
      lineHeight: '1.2'
    },
    dateTag: {
      backgroundColor: '#FFFFFF',
      padding: '8px 12px 10px',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px'
    },
    dateTagText: {
      fontFamily: "'Graphik', sans-serif",
      fontSize: '13px',
      fontWeight: 500,
      color: '#232E52',
      textTransform: 'uppercase',
      lineHeight: '1.2'
    },
    postTitle: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '28px',
      fontWeight: 600,
      color: '#232E52',
      lineHeight: '1.3',
      margin: 0
    },
    postDescription: {
      fontFamily: "'Graphik', sans-serif",
      fontSize: '18px',
      color: '#232E52',
      lineHeight: '1.5',
      margin: 0
    },
    postThumbnail: {
      width: '502px',
      height: '210px',
      borderRadius: '8px',
      objectFit: 'cover',
      flexShrink: 0
    }
  };

  return (
    <div style={styles.pageContainer} className="blog-article-page">
      <Banner />

      {/* Hero Section */}
      <div style={styles.heroSection} className="article-hero-section">
        <img src={article.heroImage} alt={article.title} style={styles.heroImage} />
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle} className="article-hero-title">{article.title}</h1>
        </div>
      </div>

      {/* Article Content */}
      <div style={styles.contentWrapper} className="article-content-wrapper">
        <article style={styles.articleContainer} className="article-container">
          {article.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p key={index} style={styles.articleParagraph}>
                  {block.text}
                </p>
              );
            } else if (block.type === 'image') {
              return (
                <img 
                  key={index} 
                  src={block.src} 
                  alt="Article content" 
                  style={styles.contentImage}
                  className="article-content-image"
                />
              );
            } else if (block.type === 'blockquote') {
              return (
                <div key={index} style={styles.blockquote} className="article-blockquote">
                  <p style={styles.blockquoteText}>{block.text}</p>
                </div>
              );
            }
            return null;
          })}
        </article>

        {/* Related Posts */}
        <div style={styles.relatedSection} className="article-related-section">
          <h2 style={styles.relatedHeading}>Fitness</h2>
          <div style={styles.relatedPostsContainer}>
            {relatedPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} style={styles.postCard} className="article-post-card">
                <div style={styles.postLeft}>
                  <div style={styles.postTop}>
                    <div style={styles.tagContainer}>
                      <div style={styles.categoryTag}>
                        <span style={styles.categoryTagText}>{post.category}</span>
                      </div>
                      <div style={styles.dateTag}>
                        <span style={styles.dateTagText}>{post.date}</span>
                      </div>
                    </div>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                  </div>
                  <p style={styles.postDescription}>{post.description}</p>
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={styles.postThumbnail}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
