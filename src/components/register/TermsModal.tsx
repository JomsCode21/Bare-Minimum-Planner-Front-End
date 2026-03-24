import logo from "@/assets/Logo+tagline.png";
import type { TermsModalProps } from "@/types/terms&condition";

function TermsModal({ isOpen, onAccept }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-txt/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="relative flex h-[min(100dvh-2rem,48rem)] w-full max-w-2xl flex-col items-center overflow-hidden rounded-[28px] bg-linear-to-t from-primary to-bg2 px-4 shadow-2xl animate-in fade-in zoom-in duration-200 sm:rounded-[40px] sm:px-6">
        <div className="mb-4 flex shrink-0 flex-col items-center pt-5 sm:pt-6">
          <div className="mb-2">
            <img
              src={logo}
              alt="Bare Minimum Planner Logo"
              className="h-24 w-24 object-contain drop-shadow-md sm:h-30 sm:w-30"
            />
          </div>
        </div>

        <div className="mb-5 flex w-full flex-1 flex-col overflow-hidden rounded-[24px] bg-[#F8F9FA] pt-5 pb-4 pl-4 pr-3 shadow-inner sm:mb-6 sm:rounded-3xl sm:pt-6 sm:pl-6 sm:pr-4">
          <h2 className="mb-4 shrink-0 text-center text-xl font-extrabold text-black">
            Terms and Condition
          </h2>

          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pr-2 font-sans text-sm leading-relaxed text-gray-700">
            <p className="text-xs text-gray-500">
              Effective Date: February 9, 2026
            </p>

            <p>
              Welcome to Bare Minimum Planner! By using this application, you
              agree to comply with and be bound by the following terms and
              conditions. Please read them carefully.
            </p>

            <div>
              <h3 className="mb-1 font-semibold text-black">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using Bare Minimum Planner, you agree to these
                Terms and Conditions and our Privacy Policy. If you do not
                agree, do not use this application.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">2. User Accounts</h3>
              <ul className="list-disc space-y-1 pl-5">
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
              <h3 className="mb-1 font-semibold text-black">
                3. User Responsibilities
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>You are responsible for the content of your tasks.</li>
                <li>
                  You agree not to use the app for unlawful or harmful
                  purposes, including but not limited to harassment, spam, or
                  data breaches.
                </li>
                <li>You must provide accurate information during registration.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">
                4. Intellectual Property
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  All app content, including design, logos, and code, is the
                  property of Bare Minimum Planner or its licensors.
                </li>
                <li>
                  You may not copy, distribute, or modify any content without
                  express written permission.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">5. Data Privacy</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  User data, including tasks and account details, is stored
                  securely in our database.
                </li>
                <li>
                  Passwords are encrypted, and authentication uses secure
                  methods.
                </li>
                <li>
                  We are committed to protecting your data and will not share it
                  with third parties except as required by law or with your
                  consent.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">
                6. Limitations of Liability
              </h3>
              <p className="mb-1">
                The app is provided "as-is" without warranties of any kind.
                Bare Minimum Planner is not responsible for:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Loss of data</li>
                <li>Unauthorized access to accounts</li>
                <li>Any damages arising from use or inability to use the app</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">
                7. Modifications to Terms
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>We may update these Terms and Conditions periodically.</li>
                <li>
                  Continued use of the app after changes constitutes acceptance
                  of the updated terms.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">8. Termination</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Users may terminate their accounts at any time.</li>
                <li>
                  Bare Minimum Planner may suspend or terminate accounts that
                  violate these Terms and Conditions.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-black">
                9. Governing Law
              </h3>
              <p>
                These Terms and Conditions are governed by the laws of the
                jurisdiction in which Bare Minimum Planner operates.
              </p>
            </div>

            <p className="pt-2 font-medium text-black">
              By using Bare Minimum Planner, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>

        <div className="mb-4 flex w-full shrink-0 justify-center gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-full bg-[#DCDCDC] py-3 font-semibold text-black shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
