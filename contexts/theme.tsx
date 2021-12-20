import { createContext, useContext , useState} from 'react';
type ThemeState = {

    isDark: boolean,
    getDark: () => Promise<any>,
    setDark: (d: boolean) => Promise<any>,


}

const themeContext = createContext({} as ThemeState);
export const useTheme = () => useContext(themeContext);

type Props = {
    children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
    const [dark , setDark  ] = useState( false)  ;

    return (
        <themeContext.Provider value={
            {
                isDark: dark,  
                getDark : async () => { 
                    // get user setting
                } , 
                setDark : async (d : boolean) => { 
                    setDark (d) 
                    // set the user setting 
                }
            }

        }>
            {children}
        </themeContext.Provider>
    )
}
