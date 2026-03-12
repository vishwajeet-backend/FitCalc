import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FinalCTA from '../components/FinalCTA';
import Banner from '../components/Banner';
import blogPosts from '../data/blogPosts';

function BlogPage() {
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
          Evidence-based fitness, pregnancy, and nutrition guides you can use today
        </div>
      </div>

      {/* Content Container */}
      <div style={styles.contentContainer} className="blog-content-container">
        {/* Fitness Section */}
        <section style={styles.section} className="blog-section">
          <h2 style={styles.sectionTitle}>Fitness</h2>
          {blogPosts.fitness.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
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
          {blogPosts.pregnancy.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
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
          {blogPosts.others.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} style={{...styles.postContainer, textDecoration: 'none', cursor: 'pointer'}} className="blog-post-card">
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

      <FinalCTA />
      <Footer />
    </div>
    
  );
}

export default BlogPage;
