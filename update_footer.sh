#!/bin/bash

# Create the new footer content
NEW_FOOTER='    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="/src/assets/images/logo.png" alt="The Reading Roost Logo">
                    <h3>The Reading Roost</h3>
                    <p>Educational Services</p>
                </div>

                <div class="footer-info">
                    <div class="footer-section">
                        <h4>Contact Information</h4>
                        <p><strong>Robin Rice, PhD (ABD), M.A., B.S.</strong></p>
                        <p>Licensed Intervention Specialist</p>
                        <p><i class="fas fa-phone"></i> <a href="tel:513-237-8618">513-237-8618</a></p>
                        <p><i class="fas fa-envelope"></i> <a href="mailto:robinrice@readingroost.com">robinrice@readingroost.com</a></p>
                        <p><i class="fas fa-envelope"></i> <a href="mailto:readingroostedservices@gmail.com">readingroostedservices@gmail.com</a></p>
                        <p><i class="fas fa-clock"></i> Monday - Friday, 8:00 AM - 4:00 PM</p>
                    </div>

                    <div class="footer-section">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            <a href="https://www.facebook.com/profile.php?id=61579870824978" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-facebook-f"></i> Facebook
                            </a>
                            <a href="https://www.linkedin.com/in/robin-rice-58a22890/" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin-in"></i> LinkedIn
                            </a>
                        </div>

                        <div class="footer-certification">
                            <p><strong>Jon Peterson Provider</strong></p>
                            <p>Licensed & Registered with Ohio Department of Education & Workforce</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 The Reading Roost Educational Services. All Rights Reserved.</p>
                <p>Empowering every child to discover the joy of learning</p>
            </div>
        </div>
    </footer>'

# Update remaining files
for file in scholarship.html testimonials.html contact-apply.html; do
    if [ -f "$file" ]; then
        # Replace the old footer pattern with new footer
        sed -i '/<footer class="main-footer-bottom">/,/<\/footer>/c\
'"$NEW_FOOTER" "$file"
        echo "Updated footer in $file"
    fi
done