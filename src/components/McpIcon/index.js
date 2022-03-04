import React from "react";
import PropTypes from "prop-types";

import BLOCK from "../../assets/icons/Dice_block.png";
import CRITICAL from "../../assets/icons/Dice_critical.png";
import FAILURE from "../../assets/icons/Dice_failure.png";
import HIT from "../../assets/icons/Dice_hit.png";
import WILD from "../../assets/icons/Dice_wild.png";
import ENERGY from "../../assets/icons/Energy.png";
import LEADERSHIP from "../../assets/icons/Leadership.png";
import MYSTIC from "../../assets/icons/Mystic.png";
import PHYSICAL from "../../assets/icons/Physical.png";
import POWER from "../../assets/icons/Power.png";
import RANGE from "../../assets/icons/Range.png";
import SIZE from "../../assets/icons/Size.png";
import SPEED from "../../assets/icons/Speed.png";
import STAMINA from "../../assets/icons/Stamina.png";
import STRENGTH from "../../assets/icons/Strength.png";
import THREAT from "../../assets/icons/Threat.png";
import DAMAGE from "../../assets/icons/Damage.png";
import ACTIVE from "../../assets/icons/Active.png";
import REACTIVE from "../../assets/icons/reactive.png";
import INNATE from "../../assets/icons/Innate.png";
import SHORT from "../../assets/icons/Speed_short.png";
import MEDIUM from "../../assets/icons/Speed_medium.png";
import LONG from "../../assets/icons/Speed_long.png";

const MCPIcon = ({ icon, size, invert }) => {
  if (!icon) return null;

  const icons = {
    block: { keys: ["{block}", "{block}", "block"], icon: BLOCK },
    critical: { keys: ["{crit}", "critical"], icon: CRITICAL },
    failure: { keys: ["{failure}", "failure", "{fail}", "fail"], icon: FAILURE },
    hit: { keys: ["{hit}", "hit"], icon: HIT },
    wild: { keys: ["{wild}", "wild"], icon: WILD },
    energy: { keys: ["{energy}", "energy", "{enrg}", "enrg"], icon: ENERGY },
    leadership: { keys: ["{leadership}", "leadership"], icon: LEADERSHIP },
    mystic: { keys: ["{mystic}", "mystic", "{myst}", "myst"], icon: MYSTIC },
    physical: {
      keys: ["{physical}", "physical", "{phys}", "phys"],
      icon: PHYSICAL,
    },
    power: { keys: ["{pwr}", "power"], icon: POWER },
    range: { keys: ["{rng}", "range"], icon: RANGE },
    size: { keys: ["{size}", "size"], icon: SIZE },
    speed: { keys: ["{speed}", "speed"], icon: SPEED },
    stamina: { keys: ["{stamina}", "stamina"], icon: STAMINA },
    strength: { keys: ["{strength}", "strength"], icon: STRENGTH },
    threat: { keys: ["{threat}", "threat"], icon: THREAT },
    damage: { keys: ["{dmg}", "damage"], icon: DAMAGE },
    active: { keys: ["active", "act", "{active}", "{act}"], icon: ACTIVE },
    reactive: {
      keys: ["reactive", "react", "{reactive}", "{react}"],
      icon: REACTIVE,
    },
    innate: { keys: ["innate", "inn", "{innate}", "{inn}"], icon: INNATE },
    short: { keys: ["short", "{short}", "s", "{s}"], icon: SHORT },
    medium: { keys: ["medium", "{medium}", "m", "{m}"], icon: MEDIUM },
    long: { keys: ["long", "{long}", "l", "{l}"], icon: LONG },
  };

  const selectedIcon = Object.keys(icons).filter((key) => {
    const current = icons[key];
    return current.keys.includes(icon.toLowerCase());
  });

  const iconSize = !size.localeCompare("large")
    ? 30
    : !size.localeCompare("medium")
    ? 25
    : 20;

  return (
    <span
      style={{
        display: "inline-block",
        height: iconSize,
        width: iconSize,
        backgroundImage: `url(${icons[selectedIcon]?.icon})`,
        backgroundSize: "cover",
        lineHeight: 1,
        marginLeft: "3px",
        marginRight: "3px",
        flexShrink: 0,
        filter: invert ? "invert(100%)" : "invert(0%)",
        verticalAlign: "middle",
      }}
    ></span>
  );
};

MCPIcon.defaultProps = {
  size: "small",
  icon: "power",
  invert: true,
};
MCPIcon.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.string,
  invert: PropTypes.bool,
};

export default MCPIcon;
