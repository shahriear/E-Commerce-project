import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
        convallis nulla. Fusce dignissim, elit ut placerat cursus, orci sapien
        tempus purus, nec tincidunt ex lorem nec massa.
      </p>
      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        <li>Refunds are available within 30 days of purchase.</li>
        <li>Products must be in original condition.</li>
        <li>Refund will be processed within 5-7 business days.</li>
        <li>Contact our support for further assistance.</li>
      </ul>
    </div>
  );
}
