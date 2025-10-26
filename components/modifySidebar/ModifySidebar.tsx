"use client"
import { useAppSelector } from '@/lib/hooks';
import ModifySidebarText from './ModifySidebarText';
import ModifyColumn from './ModifyColumn';
import { useMemo } from 'react';

const ModifySidebar = () => {
   const elementClicked = useAppSelector(state => state.elementClicked);
   const renderModifySidebar = useMemo(() => {
    switch (elementClicked.type) {
      case 'text':
        return <ModifySidebarText />;
      case 'column':
        return <ModifyColumn />;
      default:
        return <></>;
    }
  }, [elementClicked.type]);
  return renderModifySidebar;
}

export default ModifySidebar
