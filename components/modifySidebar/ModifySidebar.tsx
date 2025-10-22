"use client"
import { useAppSelector } from '@/lib/hooks';
import ModifySidebarText from './ModifySidebarText';

const ModifySidebar = () => {
   const elementClicked = useAppSelector(state => state.elementClicked)
    return elementClicked.type === 'text' ? <ModifySidebarText /> : <></>
}

export default ModifySidebar
