import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const CrisesCardDetail = ({ open, toggle, card }) => {
  const [loading, setLoading] = React.useState(true);
  const [facing, setFacing] = React.useState(0);

  const handleBgClick = () => {
    if (facing === 1) handleCloseOverlay();
    flipCard();
  };

  const handleCloseOverlay = () => {
    toggle();
    setLoading(false);
  };

  const flipCard = () => {
    setFacing((prev) => (prev ? 0 : 1));
  };

  const CrisisCardImage = () => (
    <img
      src={`${process.env.PUBLIC_URL}/assets/crises/${card?.image}`}
      alt={card?.name}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90vw",
        maxHeight: "90vh",
        zIndex: 2,
        opacity: loading ? 0.75 : 1,
      }}
      onLoad={() => setLoading(false)}
    />
  );

  const DeploymentMapImage = ({ type }) => (
    <img
      src={`${process.env.PUBLIC_URL}/assets/crises/${type}.png`}
      alt={type}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90vw",
        maxHeight: "90vh",
        zIndex: 2,
        opacity: loading ? 0.75 : 1,
      }}
      onLoad={() => setLoading(false)}
    />
  );

  return (
    <Backdrop open={open} onClick={handleBgClick} sx={{ zIndex: 1 }}>
      {loading && <CircularProgress sx={{ zIndex: 3 }} />}
      {!facing && <CrisisCardImage />}
      {facing && <DeploymentMapImage type={card?.map?.toLowerCase()} />}
    </Backdrop>
  );
};

export default CrisesCardDetail;
