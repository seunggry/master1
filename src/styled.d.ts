import 'styled-components';

//and extend them!
declare module 'styled-components' {
    export interface DefaultTheme{
        //테마가 어떻게 보일지 설명할 부분
        bgColor: string;
        textColor: string;
        subTextColor1: string;
        subTextColor2: string;
        accentColor: string;
        boxBgColor: string;
    }
}