
import React from 'react';

const GoogleMap: React.FC = () => {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6998427.039106994!2d-2.1088947944105497!3d23.796226635675604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13883b64fb267151%3A0xd6406bdc582d7390!2sSahara!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Desert Dreams Adventures Location"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
