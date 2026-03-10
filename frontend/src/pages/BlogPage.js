import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

function BlogPage() {
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

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
    },
    heroSection: {
      position: 'relative',
      height: '445px',
      width: '100%',
      maxWidth: '1376px',
      margin: '60px auto 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
      boxSizing: 'border-box',
    },
    heroImage: {
      position: 'absolute',
      top: 0,
      left: 32,
      right: 32,
      bottom: 0,
      width: 'calc(100% - 64px)',
      height: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    heroImageInner: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '12px',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '12px',
      pointerEvents: 'none',
    },
    heroText: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '970px',
      padding: '0 32px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '36px',
      fontWeight: 600,
      lineHeight: '1',
      color: '#FFFFFF',
      textAlign: 'left',
    },
    contentContainer: {
      maxWidth: '1376px',
      margin: '0 auto',
      padding: '60px 32px 100px',
      display: 'flex',
      flexDirection: 'column',
      gap: '100px',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    sectionTitle: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#232E52',
      lineHeight: 'normal',
      marginBottom: '0',
    },
    postContainer: {
      display: 'flex',
      gap: '60px',
      alignItems: 'center',
      paddingBottom: '32px',
      borderBottom: '1px solid #EBF2FE',
    },
    postLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1,
    },
    postHeader: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    tagContainer: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    tag: {
      backgroundColor: '#EBF2FE',
      padding: '8px 12px 10px',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '13px',
      fontWeight: 600,
      color: '#232E52',
      textTransform: 'uppercase',
      lineHeight: '1.2',
    },
    dateTag: {
      backgroundColor: '#FFFFFF',
      padding: '8px 12px 10px',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
      fontFamily: 'Graphik, sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      color: '#232E52',
      textTransform: 'uppercase',
      lineHeight: '1.2',
    },
    postTitle: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '1.3',
      color: '#232E52',
      margin: 0,
      maxWidth: '610px',
    },
    postDescription: {
      fontFamily: 'Graphik, sans-serif',
      fontSize: '18px',
      lineHeight: '1.5',
      color: '#232E52',
      margin: 0,
      maxWidth: '610px',
    },
    postThumbnail: {
      width: '502px',
      height: '210px',
      borderRadius: '8px',
      objectFit: 'cover',
      flexShrink: 0,
    },
    ctaSection: {
      backgroundColor: '#F2F4F9',
      borderRadius: '10px',
      padding: '100px 56px',
      margin: '60px 32px 80px',
      maxWidth: '1375px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ctaContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      maxWidth: '650px',
    },
    ctaHeading: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '48px',
      fontWeight: 600,
      lineHeight: 'normal',
      color: '#0F1524',
      textShadow: '0px 1px 1px rgba(0,0,0,0.2)',
      margin: 0,
    },
    ctaSubtext: {
      fontFamily: 'Source Sans 3, sans-serif',
      fontSize: '24px',
      fontWeight: 300,
      lineHeight: '1.2',
      color: '#15181E',
      textShadow: '0px 1px 1px rgba(0,0,0,0.21)',
      margin: 0,
    },
    ctaButton: {
      backgroundColor: '#3D568F',
      color: '#FFFFFF',
      padding: '14px 22px',
      borderRadius: '10px',
      border: 'none',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '0.32px',
      lineHeight: '16px',
      cursor: 'pointer',
      textTransform: 'capitalize',
      display: 'inline-block',
      textDecoration: 'none',
      transition: 'background-color 0.2s',
    },
    header: {
      backgroundColor: '#FFFFFF',
      backdropFilter: 'blur(5px)',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 42px',
      position: 'sticky',
      top: 0,
      zIndex: 1001,
    },
    headerContent: {
      maxWidth: '1800px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontWeight: 500,
      fontSize: '36px',
      color: '#161E24',
      textDecoration: 'none',
    },
    nav: {
      display: 'flex',
      gap: '24px',
      alignItems: 'center',
    },
    navItem: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '14px',
      color: '#000000',
      textDecoration: 'none',
      padding: '15px 10px',
      lineHeight: '22.4px',
    },
  };

  const blogPosts = {
    fitness: [
      {
        slug: 'understanding-your-bmi',
        title: 'Understanding Your BMI: What the Numbers Really Mean',
        description: 'Learn how to interpret your BMI results and what factors contribute to maintaining a healthy body mass index.',
        date: 'March 1, 2026',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      },
      {
        slug: 'calorie-counting-science',
        title: 'The Science Behind Calorie Counting for Weight Management',
        description: 'Discover the relationship between calories, metabolism, and effective weight management strategies.',
        date: 'February 28, 2026',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
      },
      {
        slug: 'body-fat-vs-bmi',
        title: 'Body Fat Percentage vs BMI: Which Matters More?',
        description: 'Understand the key differences between body fat percentage and BMI, and which metric is more accurate for tracking fitness.',
        date: 'February 25, 2026',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      },
    ],
    pregnancy: [
      {
        slug: 'pregnancy-calculator-guide',
        title: 'Pregnancy Calculator Guide: Tracking Your Journey Week by Week',
        description: 'Everything you need to know about calculating your due date, pregnancy weeks, and developmental milestones.',
        date: 'March 2, 2026',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
      },
      {
        slug: 'conception-fertility-windows',
        title: 'Understanding Conception Dates and Fertility Windows',
        description: 'A comprehensive guide to calculating conception dates, ovulation, and maximizing your chances of pregnancy.',
        date: 'February 29, 2026',
        image: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&q=80',
      },
      {
        slug: 'healthy-pregnancy-weight-gain',
        title: 'Healthy Weight Gain During Pregnancy: What to Expect',
        description: 'Learn about recommended weight gain ranges, trimester-by-trimester changes, and maintaining optimal health.',
        date: 'February 26, 2026',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
      },
    ],
    others: [
      {
        slug: 'macro-tracking-beginners',
        title: 'The Ultimate Guide to Macro Tracking for Beginners',
        description: 'Start your nutrition journey with this comprehensive guide to calculating and tracking macronutrients.',
        date: 'March 3, 2026',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      },
      {
        slug: 'daily-protein-requirements',
        title: 'How to Calculate Your Daily Protein Requirements',
        description: 'Discover how much protein you really need based on your activity level, goals, and body composition.',
        date: 'February 27, 2026',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
      },
      {
        slug: 'tdee-explained',
        title: 'TDEE Explained: Calculate Your Total Daily Energy Expenditure',
        description: 'Master the science of energy balance by understanding how to calculate and use your TDEE effectively.',
        date: 'February 24, 2026',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      },
    ],
  };

  return (
    <div style={styles.container} className="blog-page-container">
      <Banner />
      {/* Hero Section */}
      <div style={styles.heroSection} className="blog-hero-section">
        <div style={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=80"
            alt="Blog hero"
            style={styles.heroImageInner}
          />
          <div style={styles.heroOverlay} />
        </div>
        <div style={styles.heroText} className="blog-hero-text">
          Insights about my personal and work life, and the in-betweens
        </div>
      </div>

      {/* Content Container */}
      <div style={styles.contentContainer} className="blog-content-container">
        {/* Fitness Section */}
        <section style={styles.section} className="blog-section">
          <h2 style={styles.sectionTitle}>Fitness</h2>
          {blogPosts.fitness.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={index} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
              <div style={styles.postLeft}>
                <div style={styles.postHeader}>
                  <div style={styles.tagContainer}>
                    <span style={styles.tag}>Fitness</span>
                    <span style={styles.dateTag}>{post.date}</span>
                  </div>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                </div>
                <p style={styles.postDescription}>{post.description}</p>
              </div>
              <img src={post.image} alt={post.title} style={styles.postThumbnail} />
            </Link>
          ))}
        </section>

        {/* Pregnancy Section */}
        <section style={styles.section} className="blog-section">
          <h2 style={styles.sectionTitle}>Pregnancy</h2>
          {blogPosts.pregnancy.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={index} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
              <div style={styles.postLeft}>
                <div style={styles.postHeader}>
                  <div style={styles.tagContainer}>
                    <span style={styles.tag}>Pregnancy</span>
                    <span style={styles.dateTag}>{post.date}</span>
                  </div>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                </div>
                <p style={styles.postDescription}>{post.description}</p>
              </div>
              <img src={post.image} alt={post.title} style={styles.postThumbnail} />
            </Link>
          ))}
        </section>

        {/* Others Section */}
        <section style={styles.section} className="blog-section">
          <h2 style={styles.sectionTitle}>Others</h2>
          {blogPosts.others.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={index} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
              <div style={styles.postLeft}>
                <div style={styles.postHeader}>
                  <div style={styles.tagContainer}>
                    <span style={styles.tag}>Nutrition</span>
                    <span style={styles.dateTag}>{post.date}</span>
                  </div>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                </div>
                <p style={styles.postDescription}>{post.description}</p>
              </div>
              <img src={post.image} alt={post.title} style={styles.postThumbnail} />
            </Link>
          ))}
        </section>
      </div>

      

      {/* Footer 
      <Footer />*/}
    </div>
    
  );
}

export default BlogPage;
