export const theme = {
  colors: {
    primary: '#FF0a44',
    primaryAlt: '#FFC2A0',
    secondary: '#1ba4b6',
    secondaryAlt: '#FF638E',
    paper: '#FFFFFF',
    divineMatchBackGround: 'rgb(21, 0, 56)',
    divineMatchBackGroundBubbles: 'rgb(29,11, 72)',
    error: '#FF3B30',
    background: 'rgb(240, 240, 240)',
    actionBlue: '#007AFF',
    bottomSheetBar: '#00000040',
    bottomSheetShadow: '#333333',
    fontColor: '#222B45',
    text: '#0A0A0A',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    info: '#007AFF',
    divider: 'rgb(217,216,219)',
  },
  font: {
    heading: 'Heading',
    subHeading: 'SubHeading',
    light: 'Light',
    normal: 'Normal',
    Raleway: 'Raleway',
    RalewayBold: 'RalewayBold',
    RalewayBoldItalic: 'RalewayBoldItalic',
  },
  spacing: 8,
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    secondary: '#20BED4',
    background: 'rgb(1,1,1)',
    paper: 'rgb(26,26,28)',
    error: '#FF453A',
    actionBlue: '#0A84FF',
    bottomSheetBar: 'lightgrey',
    bottomSheetShadow: 'black',
    fontColor: 'white',
    text: '#fff',
    muted: '#353434',
    divider: '#3f3f44',
    border: '#353434',
  },
};