const blogPosts = {
  fitness: [
    {
      slug: 'understanding-your-bmi',
      title: 'Understanding Your BMI: What the Numbers Really Mean',
      description:
        'BMI is a fast screening tool that helps you understand whether your weight is in a healthy range for your height.',
      date: 'March 1, 2026',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Body Mass Index (BMI) compares weight to height using a simple formula. For adults, a BMI below 18.5 is considered underweight, 18.5 to 24.9 is generally healthy, 25 to 29.9 is overweight, and 30 or above falls into obesity classes. These ranges are useful for screening risk, especially for heart disease, diabetes, and blood pressure issues.'
        },
        {
          type: 'paragraph',
          text: 'BMI works best when you treat it as a starting point, not a final diagnosis. Athletes with high muscle mass can have a higher BMI without excess body fat, while some people with a normal BMI may still carry unhealthy abdominal fat. That is why it helps to pair BMI with waist measurement, activity level, sleep quality, and blood test results.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=490&fit=crop&q=80',
          alt: 'Person tracking weight and body metrics in a notebook'
        },
        {
          type: 'blockquote',
          text: 'BMI is a screening tool that points you in the right direction. It does not replace a full health assessment.'
        },
        {
          type: 'paragraph',
          text: 'If your BMI is outside the healthy range, focus on sustainable habits instead of quick fixes: strength training two to four times per week, daily walking, protein-rich meals, and consistent sleep. Recheck your BMI every few weeks and track trends over time. Small changes done consistently usually deliver better long-term results than extreme diets.'
        }
      ]
    },
    {
      slug: 'calorie-counting-science',
      title: 'The Science Behind Calorie Counting for Weight Management',
      description:
        'Calorie tracking is most effective when you combine energy balance with consistent eating patterns and realistic targets.',
      date: 'February 28, 2026',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Weight change is driven by energy balance over time: calories in versus calories out. When intake is lower than expenditure, body mass generally trends down; when intake is higher, it trends up. This sounds simple, but day-to-day fluctuations in water, sodium, and digestion can hide progress for several days.'
        },
        {
          type: 'paragraph',
          text: 'A practical calorie target starts with your maintenance estimate (often based on TDEE), then applies a moderate adjustment. For fat loss, a daily deficit of about 300 to 500 kcal is usually easier to sustain than aggressive cuts. For muscle gain, a smaller surplus paired with strength training helps reduce unnecessary fat gain.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=490&fit=crop&q=80',
          alt: 'Meal prep containers and healthy food portions'
        },
        {
          type: 'blockquote',
          text: 'The best calorie plan is the one you can follow for months, not days.'
        },
        {
          type: 'paragraph',
          text: 'Track weekly averages instead of reacting to one weigh-in. Keep protein high, include fiber-rich foods, and adjust calories only after two to three weeks of consistent data. This approach turns calorie counting from a strict diet into a measurable, flexible system that supports long-term weight management.'
        }
      ]
    },
    {
      slug: 'body-fat-vs-bmi',
      title: 'Body Fat Percentage vs BMI: Which Matters More?',
      description:
        'BMI is useful for quick screening, while body-fat percentage gives a closer look at body composition and fitness progress.',
      date: 'February 25, 2026',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'BMI and body-fat percentage answer different questions. BMI estimates whether your weight is proportionate to your height. Body-fat percentage estimates how much of your body is fat tissue versus lean tissue. If your goal is better health and performance, both metrics can be helpful when used together.'
        },
        {
          type: 'paragraph',
          text: 'Body-fat percentage can be measured through skinfold calipers, bioelectrical impedance scales, DEXA scans, or professional assessments. Home methods are less precise, but if you measure in the same way each time, trends are still useful. Combine those trends with waist measurements and gym performance to get a fuller picture.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=490&fit=crop&q=80',
          alt: 'Athletes training in a gym environment'
        },
        {
          type: 'blockquote',
          text: 'BMI helps with population-level risk screening. Body-fat percentage helps with individual planning.'
        },
        {
          type: 'paragraph',
          text: 'For most people, a simple framework works well: use BMI for initial risk awareness, use body-fat trend and waist size for progress tracking, and use performance markers to confirm your plan is sustainable. That combination is more informative than relying on any single number in isolation.'
        }
      ]
    }
  ],
  pregnancy: [
    {
      slug: 'pregnancy-calculator-guide',
      title: 'Pregnancy Calculator Guide: Tracking Your Journey Week by Week',
      description:
        'Learn how due-date calculators work, what they can estimate accurately, and how to track each trimester with confidence.',
      date: 'March 2, 2026',
      category: 'Pregnancy',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Most pregnancy calculators estimate due date using the first day of your last menstrual period (LMP) and a typical 28-day cycle. If your cycle length differs or if you know your ovulation date, adjusting those inputs can improve accuracy. Ultrasound measurements in early pregnancy may further refine the timeline.'
        },
        {
          type: 'paragraph',
          text: 'Week-by-week tracking helps with planning appointments, nutrition goals, and lifestyle changes. During the first trimester, many people focus on nausea management and prenatal supplementation. In later trimesters, attention often shifts to growth monitoring, sleep comfort, and delivery preparation.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=1200&h=490&fit=crop&q=80',
          alt: 'Pregnant woman tracking calendar milestones'
        },
        {
          type: 'blockquote',
          text: 'A due date is an estimate, not a deadline. The goal is informed preparation, not perfect prediction.'
        },
        {
          type: 'paragraph',
          text: 'Use calculators as planning tools, then confirm key decisions with your healthcare provider. If you experience severe pain, heavy bleeding, sudden swelling, or reduced fetal movement later in pregnancy, seek medical care promptly. Reliable tools and regular prenatal care work best together.'
        }
      ]
    },
    {
      slug: 'conception-fertility-windows',
      title: 'Understanding Conception Dates and Fertility Windows',
      description:
        'Your fertile window is short but predictable. Learn how to estimate ovulation and time intercourse more effectively.',
      date: 'February 29, 2026',
      category: 'Pregnancy',
      image: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'The fertile window usually includes the five days before ovulation and the day of ovulation itself. Sperm can survive for several days in cervical mucus, while the egg remains viable for roughly 12 to 24 hours. This means timing before ovulation often matters more than timing after it.'
        },
        {
          type: 'paragraph',
          text: 'To estimate ovulation, combine methods when possible: cycle tracking, luteinizing hormone (LH) test strips, cervical mucus changes, and morning basal body temperature patterns. No single method is perfect, but combining signals improves confidence and helps identify your personal pattern across cycles.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=490&fit=crop&q=80',
          alt: 'Calendar and fertility tracking notes'
        },
        {
          type: 'blockquote',
          text: 'Consistency in tracking is more valuable than chasing one "perfect" fertile day.'
        },
        {
          type: 'paragraph',
          text: 'If cycles are very irregular, or if conception has not occurred after a reasonable period based on age and history, speak with a fertility specialist. Early support can reduce uncertainty and help you choose evidence-based options that match your timeline and goals.'
        }
      ]
    },
    {
      slug: 'healthy-pregnancy-weight-gain',
      title: 'Healthy Weight Gain During Pregnancy: What to Expect',
      description:
        'Healthy pregnancy weight gain depends on pre-pregnancy BMI and trimester stage, not one fixed number for everyone.',
      date: 'February 26, 2026',
      category: 'Pregnancy',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Recommended pregnancy weight gain ranges are typically based on pre-pregnancy BMI. People who begin pregnancy with a lower BMI are usually advised to gain more total weight, while those with higher BMI ranges may be advised to gain less. Your provider can help personalize these targets based on your medical context.'
        },
        {
          type: 'paragraph',
          text: 'Weight gain is not linear. In many pregnancies, gain is modest in the first trimester and increases gradually in the second and third trimesters. Focusing on nutrient quality, hydration, and regular light movement is usually more helpful than monitoring scale changes too closely week to week.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=490&fit=crop&q=80',
          alt: 'Healthy pregnancy meal planning and checkup notes'
        },
        {
          type: 'blockquote',
          text: 'Healthy gain supports both fetal development and maternal recovery after birth.'
        },
        {
          type: 'paragraph',
          text: 'Choose whole-food meals with protein, iron, calcium, folate, and fiber. If appetite shifts due to nausea or heartburn, smaller frequent meals can help. Any concerns about sudden gain, swelling, or blood pressure should be discussed with your care team right away.'
        }
      ]
    }
  ],
  others: [
    {
      slug: 'macro-tracking-beginners',
      title: 'The Ultimate Guide to Macro Tracking for Beginners',
      description:
        'Macro tracking helps you align food choices with your goals by balancing protein, carbohydrates, and fats.',
      date: 'March 3, 2026',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Macronutrients are the nutrients your body needs in larger amounts: protein, carbohydrates, and fats. Protein supports muscle repair and satiety, carbohydrates fuel training and daily activity, and fats support hormones and nutrient absorption. Macro tracking helps you intentionally distribute calories instead of eating randomly.'
        },
        {
          type: 'paragraph',
          text: 'A beginner-friendly starting point is to set calories first, then assign protein based on body weight and split the rest between carbs and fats according to preference and activity level. People with higher training volume usually perform better with more carbohydrates, while others may prefer slightly higher fats for meal satisfaction.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=490&fit=crop&q=80',
          alt: 'Balanced meal with proteins, carbs, and healthy fats'
        },
        {
          type: 'blockquote',
          text: 'Macro targets are a framework, not a prison. Consistency beats perfection.'
        },
        {
          type: 'paragraph',
          text: 'Review progress every two to three weeks. If energy is low, recovery is poor, or your goal trend is stalled, adjust one variable at a time. Macro tracking should simplify decisions and improve awareness, not create stress around every meal.'
        }
      ]
    },
    {
      slug: 'daily-protein-requirements',
      title: 'How to Calculate Your Daily Protein Requirements',
      description:
        'Protein needs vary by activity level, age, and goals. Learn practical ranges and how to spread intake across meals.',
      date: 'February 27, 2026',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'The general adult baseline is around 0.8 grams of protein per kilogram of body weight per day. Active people, especially those doing resistance training or in a calorie deficit, often benefit from higher ranges such as 1.2 to 2.2 g/kg/day. The ideal number depends on body composition goals, training stress, and dietary preference.'
        },
        {
          type: 'paragraph',
          text: 'Distribution matters too. Instead of eating most protein at dinner, spread intake across three to five meals. A practical target is 25 to 40 grams per meal, adjusted for body size. This pattern can improve satiety and supports muscle protein synthesis throughout the day.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1200&h=490&fit=crop&q=80',
          alt: 'High-protein foods arranged for meal planning'
        },
        {
          type: 'blockquote',
          text: 'Set protein first, then build the rest of your calories around your training and lifestyle.'
        },
        {
          type: 'paragraph',
          text: 'Good protein sources include dairy, eggs, fish, poultry, soy foods, legumes, and lean meat. If you have kidney disease or other medical conditions, discuss protein targets with a clinician before making large changes. For most healthy adults, gradual increases are safe and easy to maintain.'
        }
      ]
    },
    {
      slug: 'tdee-explained',
      title: 'TDEE Explained: Calculate Your Total Daily Energy Expenditure',
      description:
        'TDEE combines your resting metabolism, movement, and activity to estimate maintenance calories for weight goals.',
      date: 'February 24, 2026',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80',
      heroImage:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=445&fit=crop&q=80',
      content: [
        {
          type: 'paragraph',
          text: 'Total Daily Energy Expenditure (TDEE) is the number of calories you burn in a day. It includes resting metabolic rate, planned exercise, non-exercise movement (like walking and chores), and the thermic effect of food. Knowing this estimate helps you set calorie targets for fat loss, maintenance, or muscle gain.'
        },
        {
          type: 'paragraph',
          text: 'Most calculators estimate TDEE from age, sex, height, weight, and activity level. Start with the estimate, then test it against real data for two to three weeks. If body weight is stable, you are near maintenance. If it rises or falls steadily, adjust calories by 150 to 250 per day and reassess.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=490&fit=crop&q=80',
          alt: 'Runner and wearable tracker representing daily energy expenditure'
        },
        {
          type: 'blockquote',
          text: 'TDEE is an estimate that improves when you calibrate it with your own weekly results.'
        },
        {
          type: 'paragraph',
          text: 'Treat TDEE as a living number, not a fixed rule. Work schedules, sleep, stress, and training blocks can all change daily expenditure. Recalculate when your routine or body weight changes significantly, and keep decisions based on trends rather than one-day fluctuations.'
        }
      ]
    }
  ]
};

const allPosts = Object.values(blogPosts).flat();

const postBySlug = allPosts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {});

export const findPostBySlug = (slug) => postBySlug[slug] || null;

export const getRelatedPosts = (slug, limit = 3) => {
  const currentPost = findPostBySlug(slug);

  if (!currentPost) {
    return allPosts.slice(0, limit);
  }

  const sameCategory = allPosts.filter(
    (post) => post.slug !== slug && post.category === currentPost.category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const crossCategory = allPosts.filter(
    (post) => post.slug !== slug && post.category !== currentPost.category
  );

  return [...sameCategory, ...crossCategory].slice(0, limit);
};

export default blogPosts;
