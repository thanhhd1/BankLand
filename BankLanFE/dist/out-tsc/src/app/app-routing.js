export var appRoute = [
    { path: 'management', loadChildren: './modules/main/main.module#MainModule' },
    { path: 'auth', loadChildren: './modules/login/login.module#LoginModule' },
    { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];
//# sourceMappingURL=app-routing.js.map