import { Menu, MenuItem } from "@mui/material";

const ITEM_HEIGHT = 48;

interface IProps {
  open: boolean;
  options: { label: string; callback(): void }[];
  anchorEl: HTMLElement | null;
  onClose(): void;
  onLogout?(): void;
}

export const CustomMenu = ({ open, options, anchorEl, onClose }: IProps) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
          backgroundColor: "#233138",
          color: "#aebac1",
          marginTop: "8px",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.label}
          onClick={() => {
            option.callback();
            onClose();
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};
