import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NavColor } from "src/types/settings";
import type { Section } from "../config";
import { MobileNav } from "../mobile-nav";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useMobileNav } from "./use-mobile-nav";
import {
  ExpandableAlert,Select,
  ValueRating,
  FormDialog,
} from "@pautena/react-design-system";

const SIDE_NAV_WIDTH: number = 280;

const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mobileNav = useMobileNav();

  return (
    <>
    <Select label="Select" value={undefined}  />
      {/* <FormDialog
        title="Form Dialog"
        submitText="Test"
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSubmit={function (data: unknown): void {
          throw new Error("Function not implemented.");
        }}
        open={true}
      ></FormDialog> */}
      <ValueRating
        label="Value Rating"
        value={3}
      />
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && (
        <SideNav
          color={navColor}
          sections={sections}
        />
      )}
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};
