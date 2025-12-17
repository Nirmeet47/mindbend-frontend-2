"use client";
import Interactive3DCard from "@/components/sponsors/Card";
import Hyperspeed from "@/components/sponsors/Hyperspeed";
import PastSponsors from "@/components/sponsors/PastSponsors";
import "./sponsors.css";
import TypeText from "@/components/sponsors/TypeText";

// Mock data for sponsors with images
const titleSponsors = [
  {
    id: 1,
    name: "Red Bull",
    image: "/redbull.png",
    imageAlt: "Red Bull Logo",
  },
];

const platinumSponsors = [
  {
    id: 1,
    name: "Amul",
    image: "/amul.png",
    imageAlt: "Amul Logo",
  },
  {
    id: 2,
    name: "Pepsi",
    image: "/pepsi.png",
    imageAlt: "Adidas Logo",
  },
  {
    id: 3,
    name: "tea_post",
    image: "/tea_post.png",
    imageAlt: "Nike Logo",
  },
];

const goldSponsors = [
  {
    id: 1,
    name: "Monster",
    image: "/monster.png",
    imageAlt: "monster Logo",
  },
  {
    id: 2,
    name: "Fanta",
    image: "/fanta.png",
    imageAlt: "fanta Logo",
  },
  {
    id: 3,
    name: "Diet Coke",
    image: "/Diet_coke.png",
    imageAlt: "diet coke Logo",
  },
];

export default function Home() {
  return (
    <div className="sponsors-page">
      <Hyperspeed />

      <div className="layout-container">
        {/* MAIN TITLE - Our Sponsors */}
        <div className="main-sponsors-title">
          <h1 className="main-title-header">
            <TypeText
              text={["Our Sponsors"]}
              typingSpeed={100}
              pauseDuration={7000}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
        </div>

        {/* Main Sponsors Tiers */}
        <div className="sponsors-tiers-container">
          {/* TITLE SPONSORS TIER */}
          <div className="tier-section title-tier">
            <div className="tier-title">
              <h2 className="tier-header">
                <TypeText
                  text={["Title Sponsors"]}
                  typingSpeed={75}
                  pauseDuration={7000}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h2>
            </div>
            <div className="tier-cards-grid">
              {titleSponsors.map((sponsor) => (
                <Interactive3DCard
                  key={sponsor.id}
                  image={sponsor.image}
                  imageAlt={sponsor.imageAlt}
                  sponsorName={sponsor.name}
                  scaleOnHover={true}
                  className="title-sponsor-card"
                />
              ))}
            </div>
          </div>

          {/* PLATINUM SPONSORS TIER */}
          <div className="tier-section platinum-tier">
            <div className="tier-title">
              <h2 className="tier-header">
                <TypeText
                  text={["Platinum Sponsors"]}
                  typingSpeed={75}
                  pauseDuration={7000}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h2>
            </div>
            <div className="tier-cards-grid">
              {platinumSponsors.map((sponsor) => (
                <Interactive3DCard
                  key={sponsor.id}
                  image={sponsor.image}
                  imageAlt={sponsor.imageAlt}
                  sponsorName={sponsor.name}
                  scaleOnHover={true}
                  className="platinum-sponsor-card"
                />
              ))}
            </div>
          </div>

          {/* GOLD SPONSORS TIER */}
          <div className="tier-section gold-tier">
            <div className="tier-title">
              <h2 className="tier-header">
                <TypeText
                  text={["Gold Sponsors"]}
                  typingSpeed={75}
                  pauseDuration={7000}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h2>
            </div>
            <div className="tier-cards-grid">
              {goldSponsors.map((sponsor) => (
                <Interactive3DCard
                  key={sponsor.id}
                  image={sponsor.image}
                  imageAlt={sponsor.imageAlt}
                  sponsorName={sponsor.name}
                  scaleOnHover={true}
                  className="gold-sponsor-card"
                />
              ))}
            </div>
          </div>

          {/* PAST SPONSORS SECTION - Separated with proper spacing */}
          <div className="tier-section past-tier">
            <div className="tier-title">
              <h2 className="tier-header">
                <TypeText
                  text={["Past Sponsors"]}
                  typingSpeed={75}
                  pauseDuration={7000}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h2>
            </div>
            <div className="past-sponsors-container">
              <PastSponsors />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
