import logo from "@/assets/Logo+tagline.png";
import type { TermsModalProps } from "@/types/terms&condition";

function TermsModal({ isOpen, onAccept }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    // Dark Overlay
    <div className="fixed inset-0 bg-txt/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-linear-to-t from-primary to-bg2 w-full max-w-md h-[85vh] md:h-[90vh] rounded-[40px] shadow-2xl flex flex-col items-center px-6 relative overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-4 shrink-0">
          <div className="mb-2">
            <img
              src={logo}
              alt="Bare Minimum Planner Logo"
              className="w-30 h-30 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* The White Box (Now controls layout, but doesn't scroll) */}
        <div className="bg-[#F8F9FA] rounded-3xl pt-6 pb-4 pl-6 pr-4 w-full flex-1 mb-6 flex flex-col shadow-inner overflow-hidden">
          
          {/* 📌 Pinned Title */}
          <h2 className="text-xl font-extrabold text-center mb-4 text-black shrink-0">
            Terms and Condition
          </h2>

          {/* 📌 Scrollable Text Area */}
          <div className="text-sm text-gray-700 space-y-4 font-sans leading-relaxed flex-1 overflow-y-auto custom-scrollbar pr-2 pb-2">
            <p className="text-xs text-gray-500">
              Effective Date: February 9, 2026
            </p>

            <p>
              Welcome to Bare Minimum Planner! By using this application, you
              agree to comply with and be bound by the following terms and
              conditions. Please read them carefully.
            </p>

            <div>
              <h3 className="text-black font-semibold mb-1">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using Bare Minimum Planner, you agree to these
                Terms and Conditions and our Privacy Policy. If you do not
                agree, do not use this application.
              </p>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                2. User Accounts
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Users must register with a valid email address to access task
                  management features.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </li>
                <li>
                  You must notify us immediately if you suspect unauthorized
                  access to your account.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                3. User Responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You are responsible for the content of your tasks.</li>
                <li>
                  You agree not to use the app for unlawful or harmful purposes,
                  including but not limited to harassment, spam, or data breaches.
                </li>
                <li>You must provide accurate information during registration.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                4. Intellectual Property
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  All app content, including design, logos, and code, is the property
                  of Bare Minimum Planner or its licensors.
                </li>
                <li>
                  You may not copy, distribute, or modify any content without
                  express written permission.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                5. Data Privacy
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  User data, including tasks and account details, is stored
                  securely in our database.
                </li>
                <li>
                  Passwords are encrypted, and authentication uses secure methods.
                </li>
                <li>
                  We are committed to protecting your data and will not share it
                  with third parties except as required by law or with your consent.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                6. Limitations of Liability
              </h3>
              <p className="mb-1">
                The app is provided “as-is” without warranties of any kind. Bare Minimum Planner is not responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of data</li>
                <li>Unauthorized access to accounts</li>
                <li>Any damages arising from use or inability to use the app</li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                7. Modifications to Terms
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>We may update these Terms and Conditions periodically.</li>
                <li>
                  Continued use of the app after changes constitutes acceptance of
                  the updated terms.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                8. Termination
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Users may terminate their accounts at any time.</li>
                <li>
                  Bare Minimum Planner may suspend or terminate accounts that
                  violate these Terms and Conditions.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-1">
                9. Governing Law
              </h3>
              <p>
                These Terms and Conditions are governed by the laws of the
                jurisdiction in which Bare Minimum Planner operates.
              </p>
            </div>

            <p className="font-medium text-black pt-2">
              By using Bare Minimum Planner, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="shrink-0 w-full flex justify-center gap-3 mb-2">
          <button
            onClick={onAccept}
            className="flex-1 bg-[#DCDCDC] text-black font-semibold py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;