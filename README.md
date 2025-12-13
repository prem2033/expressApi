# expressApi


 
# Helemet

| WithOutHelmet | With Helment |
|------|-----|
| ![WithotHelmet](assets/images/without-helemt.jpg)  | ![WithotHelmet](assets/images/with-helemt.jpg)   |



## Recommended Configuration 
    app.use(
        helmet({
            contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
            },
            },
            referrerPolicy: { policy: "no-referrer" },
        })
    );

## Disable few headers
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
