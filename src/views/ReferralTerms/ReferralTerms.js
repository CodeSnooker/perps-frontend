import React, { useEffect } from "react";
import Footer from "../../Footer";
import SEO from "../../components/Common/SEO";
import { getPageTitle } from "../../Helpers";
import "./ReferralTerms.css";

export default function ReferralTerms(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SEO title={getPageTitle("Referral Terms")}>
      <div className="default-container Page page-layout">
        <div>
          <div className="Page-title-section center">
            <div className="Page-title">Quick Perpetual Referral Program</div>
            <div className="Page-subtitle">Terms and Conditions</div>
            <div className="Page-description">Last modified: May 1., 2023</div>
          </div>
          <div className="content">
            <div className="section">
              <p className="body-text">
                We welcome you to the Referral Program of Quick Perpetual. On these pages we provide information and
                resources about the fundamentals and functionality of the decentralised non-custodial protocol called
                Quick Perpetual (QPX, MV.T, or the MV.T DApp )
              </p>
              <p className="body-text">
                These Terms and Conditions and any other documents incorporated herein by reference (collectively, these
                “Terms”) to you or the company or other legal entity you represent (“you”, “your”, “the Referrer”, “the
                Affiliate”), explains the terms and conditions by which you may use the Quick Perpetual Referral Program
                (“Referral Program”) as defined below.
              </p>
              <p className="body-text">
                If you do not agree to any of these terms, please do not use the Referral Program.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">1. Use of the Referral Program</h3>
              <p className="body-text">
                The Referral Program allows you to provide a platform for advertising the Quick Perpetual DApp and
                thereby driving traffic to it, whereby you may earn a portion of the revenue generated
                (“Fee-Commissions”) if a person that is not you (“Trader”, “Referred User”) trades in the Quick
                Perpetual DApp after being referred to it from an hyperlink (“Link”) or manually input your code
                (“Referral Code”). The Trader will benefit from a fee discount (“Discount”) associated with the
                Referrer's tier.
              </p>
              <p className="body-text">
                After being referred to the Quick Perpetual DApp from an affiliate link, the Trader's browser will save
                your Referral Code and it will be assigned to the Trader on his first trade. A Trader can also manually
                enter your Referral Code in the Traders section and change it at any time.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">2. Obligations</h3>
              <p className="body-text">
                As an Affiliate, Quick Perpetual DApp provides you with the Links and Referral Codes necessary to
                promote the Quick Perpetual protocol. You acknowledge and agree it is your sole responsibility to
                indicate your correct Referral Code. You may promote the Quick Perpetual protocol offerings in any
                manner you choose unless it misleads someone about the Quick Perpetual protocol.
              </p>
              <p className="body-text">
                Quick Perpetual is not responsible for (i) lost sales or lost opportunity to earn Fee-Commissions due to
                any cause, such as technical difficulties or over-capacity including system overload in the polygon
                blockchain; (ii) tracking Fee-Commissions, Fee-Discounts, or any other data, as this is handled by
                independent smart contracts.
              </p>
              <p className="body-text">
                You will be excluded from the Referral Program, at our sole discretion: (i) if you use any languague
                libelous, defamatory, profane, obscene, pornographic, sexually explicit, indecent, lewd, vulgar,
                suggestive, harassing, stalking, hateful, threatening, offensive, discriminatory, bigoted, abusive,
                inflammatory, fraudulent, deceptive, or otherwise objectionable or likely or intended to incite,
                threaten, facilitate, promote, or encourage hate, racial intolerance, or violent acts against others;
                (ii) if you try any form of gaming through self-referrals.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">3. Rebates and Discounts</h3>
              <p className="body-text">
                Referrers will receive Fee-Commissions based on a sliding percentage of fees paid by Referred Users.
                Commissions will never be retroactive.
              </p>
              <p className="body-text">
                The Quick Perpetual team is under no obligation whatsoever to manually pay Fee-Commissions or
                Fee-Discounts to any Referrer or Trader. Fee-Commissions or Fee-Discounts are handled in accordance with
                the directives of the Quick Perpetual tokenholders and the Terms can be updated via a governance vote.
              </p>
              <p className="body-text ">
                Fee-Commissions or Fee-Discounts percentages for the default tier Tier 1, and instructions to upgrade to
                Tier 2 and Tier 3, are contained in{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ahreftextcolor"
                  href="https://perps-docs.quickswap.exchange/our-referral-program"
                >
                  https://perps-docs.quickswap.exchange/our-referral-program
                </a>
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">4. Limitation of Liability and Indemnification</h3>
              <p className="body-text">
                Under no circumstances Quick Perpetual shall be liable for any direct, indirect, incidental, punitive,
                special, or consequential damages for any reason whatsoever related to these Terms, your use or
                inability to use our website(s) or the materials and content of the web site(s) or any other websites
                Linked to such website(s) or your provision of any personally identifiable information to backend
                service provider or any third party. This limitation applies regardless of whether the alleged liability
                is based on contract, tort, warranty, negligence, strict liability or any other basis, even if we have
                been advised of the possibility of such damages or such damages were reasonably foreseeable. Because
                certain jurisdictions do not permit the limitation or elimination of liability for consequential or
                incidental damages, our liability in such jurisdictions shall be limited to the greatest extent
                permitted by law. If any provision of this limitation of liability is found to be unenforceable, only
                such provision shall be removed and the remainder shall be enforced to the greatest extent permitted by
                law.
              </p>
              <p className="body-text">
                In no event shall our liability, regardless of the form of action and damages suffered by you, exceed
                five hundred dollars (500$).
              </p>
              <p className="body-text">
                With respect to Quick Perpetual, as well as the contractors, agents, employees, officers, directors,
                shareholders, and affiliates of such parties, you agree to defend, release, indemnify, and hold such
                parties harmless from all liabilities, claims and expenses, including attorney’s fees and court costs,
                for third party claims relating to or arising under these Terms, the service(s) provided by Quick
                Perpetual, or your use of the service(s) provided by Quick Perpetual, including, without limitation,
                infringement by you, or by anyone else using such service(s) we provide to you, of any intellectual
                property or other proprietary right of any person or entity, or from the violation of any of our
                operating rules or policies relating to the service(s) provided. When we may be involved in a suit
                involving a third party and which is related to our service(s) to you under these Terms, we may seek
                written assurances from you in which you promise to defend, indemnify and hold us harmless from the
                costs and liabilities described in this paragraph. Such written assurances may include, in our sole
                discretion, the posting of a performance bond(s) or other guarantees reasonably calculated to guarantee
                payment. Your failure to provide such assurances may be considered by us to be a breach of these Terms
                by you. The terms of this paragraph will survive any termination or cancellation of the Terms.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">5. General</h3>
              <p className="body-text">
                These Terms, including other policies or agreements incorporated herein, constitute the entire and only
                agreement between you and Quick Perpetual with respect to the subject matter of these Terms, and
                supersede any and all prior or contemporaneous agreements, representations, warranties and
                understandings, written or oral, with respect to the subject matter of these Terms. Any failure by us to
                exercise or enforce any right or provision of the Terms shall not constitute a waiver of such right or
                provision.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">6. Eligibility</h3>
              <p className="body-text">
                You must legally be able to enter into the Terms. By using the Referral Program, you represent and
                warrant that you meet the eligibility requirement. If you do not meet the requirement, you must not
                access the Referral Program.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">7. Modification, suspension and termination</h3>
              <p className="body-text">
                The Referral Program runs independently from Quick Perpetual, and it is determined by the tokenholders
                of QPX. Due to this from time to time and with or without prior notice to you, the Referral Program
                could be subject to modifications, suspensions or disabilities, in whole or in part, for any reason
                whatsoever. Quick Perpetual will not be liable for any losses suffered by you resulting from any
                modification to the Referral Program or from any modification, suspension, or termination, for any
                reason, of your access to all or any portion of the Interface or the Protocol.
              </p>
              <p className="body-text">
                Quick Perpetual may revise these Terms from time to time. We will notify you by updating the date at the
                top of the Terms and by maintaining a current version of the Terms. The most current version of the
                Terms, which will always be at{" "}
                <a href="https://perps.quickswap.exchange/#/referral-terms" target="_blank" className="ahreftextcolor">
                  https://perps.quickswap.exchange/#/referral-terms
                </a>{" "}
                . All modifications will be effective when they are posted. By using the Referral Program after those
                revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">8. Independent Parties</h3>
              <p className="body-text">
                Nothing contained herein will be construed to create the relationship of principal and agent, employer
                and employee, partners or joint venturers. Each party shall ensure that the foregoing persons shall not
                represent to the contrary, either expressly, implicitly, by appearance or otherwise.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">9. Enforceability</h3>
              <p className="body-text">
                In the event that any provision of these Terms shall be unenforceable or invalid under any applicable
                law or be so held by applicable court decision, such unenforceability or invalidity shall not render
                these Terms unenforceable or invalid as a whole. Quick Perpetual will amend or replace such provision
                with one that is valid and enforceable and which achieves, to the extent possible, our original
                objectives and intent as reflected in the original provision.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">10. Assignment</h3>
              <p className="body-text">
                You may not assign or transfer any right to use the Referral Program, or any of your rights or
                obligations under these Terms, without our express prior written consent, including by operation of law
                or in connection with any change of control. Quick Perpetual may assign or transfer any or all of our
                rights or obligations under these Terms, in whole or in part, without notice or obtaining your consent
                or approval.
              </p>
            </div>
            <div className="section">
              <h3 className="body-title">11. Force Majeure</h3>
              <p className="body-text">
                Neither party shall be liable for any default, delay or cessation of its obligations under these Terms
                due to a Force Majeure Event. For the sake of clarity, a Force Majeure Event shall be understood as an
                event which is beyond the control of the affected party, including (but not limited to) fire, flood,
                earthquake, disaster, elements of nature or acts of God, acts of war, terrorism, riots, civil disorders,
                rebellions or revolutions, strikes, lockouts, or labour difficulties; or any law, order regulation,
                direction, action or request of the government, including any federal, state and local governments
                having or claiming jurisdiction over Quick Perpetual, the Protocol, or of any department, agency,
                commission, bureau, corporation or other instrumentality of any federal, state, or local government, or
                of any civil or military authority; or any other cause or circumstance, whether of a similar or
                dissimilar nature to the foregoing, beyond the reasonable control of the affected party.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  );
}
