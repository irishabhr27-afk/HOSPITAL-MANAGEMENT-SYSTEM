import { createTheme } from "@mui/material/styles";

const theme = createTheme({

palette:{

primary:{
main:"#2563EB"
},

secondary:{
main:"#14B8A6"
},

success:{
main:"#22C55E"
},

warning:{
main:"#F59E0B"
},

error:{
main:"#EF4444"
},

background:{
default:"#F4F7FE",
paper:"#FFFFFF"
}

},

shape:{
borderRadius:18
},

typography:{

fontFamily:"Poppins",

h3:{
fontWeight:700
},

h4:{
fontWeight:700
},

h5:{
fontWeight:600
},

button:{
textTransform:"none",
fontWeight:600
}

},

components:{

MuiPaper:{
styleOverrides:{
root:{
borderRadius:18,
boxShadow:"0 10px 35px rgba(0,0,0,.08)"
}
}
},

MuiButton:{
styleOverrides:{
root:{
borderRadius:14,
padding:"10px 22px"
}
}
},

MuiCard:{
styleOverrides:{
root:{
borderRadius:20
}
}
}

}

});

export default theme;