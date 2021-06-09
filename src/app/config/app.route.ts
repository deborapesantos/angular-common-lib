import { UIRouterModule }  from '@uirouter/angular';

import { AppComponent } from './../app.component';
import { GridComponent } from './../components/grid/grid.component';

import { TesteGridComponent } from './../components/teste-grid/teste-grid.component';
import { TesteModalComponent } from './../components/teste-modal/teste-modal.component';
import { SimpleGridComponent } from './../simple-grid/simple-grid.component';

const stateConfig = [
    {
        name:'home',
        url:'/',
        component:AppComponent
    },
    {
        name:'grid',
        url:'/Grid',
        component:GridComponent
    },
    
    {
        name:'testegrid',
        url:'/testegrid',
        component: TesteGridComponent
    },
    {
        name:'gridsimples',
        url:'/gridsimples',
        component: SimpleGridComponent
    },
    {
        name:'testemodal',
        url:'/testemodal',
        component: TesteModalComponent
    }
];

export const Routing = UIRouterModule.forRoot({states:stateConfig, useHash:true});