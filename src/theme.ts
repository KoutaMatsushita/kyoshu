import { extendTheme, Theme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const globalStyle: Partial<Theme> = {
  styles: {
    global: {
      "html, body, #app": {
        height: "100%",
        width: "100%",
      },
    },
  },
};

export const theme = extendTheme({ config, ...globalStyle });
