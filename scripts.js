async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Use the data here
        console.log(data);

        // Update the hero section
        const heroHeadline = document.getElementById('hero-headline');
        const heroSubheadline = document.getElementById('hero-subheadline');
        heroHeadline.textContent = data?.hero?.headline;
        heroSubheadline.textContent = data?.hero?.subheadline;

        // Update the features section
        const featuresSection = document.querySelector('.features');
        const featureText = featuresSection.querySelector('.feature-text');
        data.features.forEach(feature => {
            featureText.innerHTML += `
                <div class="feature-item">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            `;
        });

  // Update the testimonial section
  const testimonialTitle = document.getElementById('testimonial-title');
  const testimonialItemsContainer = document.getElementById('testimonial-items-container');

  testimonialTitle.textContent = "What Our Users Say About Us?";

  data?.testimonials?.forEach(testimonial => {
      const testimonialItem = document.createElement('div');
      testimonialItem.classList.add('testimonial-item');
      testimonialItem.innerHTML = `
          <div class="customizable-image">
              <img src="${testimonial.avatar}" alt="${testimonial.name}" />
          </div>
          <div>
              <p>${testimonial.feedback}</p>
              <cite>${testimonial.name}</cite>
          </div>
      `;
      testimonialItemsContainer.appendChild(testimonialItem);
  });

 // Update the pricing section
 const pricingSection = document.getElementById('pricing-section');
 const pricingPlansContainer = document.getElementById('pricing-plans-container');
 pricingSection.querySelector('h1').textContent = 'Pricing Plans';

 data?.pricing?.forEach(plan => {
     const pricingPlan = document.createElement('div');
     pricingPlan.classList.add('pricing-plan');
     pricingPlan.innerHTML = `
         <h2>${plan.plan}</h2>
         <p>${plan.price}</p>
         <ul>
             ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
         </ul>
     `;
     pricingPlansContainer.appendChild(pricingPlan);
 });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchData();
