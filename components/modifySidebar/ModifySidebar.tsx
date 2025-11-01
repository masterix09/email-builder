"use client"
import { useAppSelector } from '@/lib/hooks';
import ModifySidebarText from './ModifySidebarText';
import ModifyColumn from './ModifyColumn';
import ModifySidebarImage from './ModifySidebarImage';
import ModifySidebarButton from './ModifySidebarButton';
import ModifySidebarDivider from './ModifySidebarDivider';
import ModifySidebarSpacer from './ModifySidebarSpacer';
import ModifySidebarLink from './ModifySidebarLink';
import ModifySidebarHeading from './ModifySidebarHeading';
import { useMemo } from 'react';
import { Settings2 } from 'lucide-react';

const ModifySidebar = () => {
   const elementClicked = useAppSelector(state => state.elementClicked);
   const renderModifySidebar = useMemo(() => {
    switch (elementClicked.type) {
      case 'text':
        return <ModifySidebarText />;
      case 'image':
        return <ModifySidebarImage />;
      case 'column':
        return <ModifyColumn />;
      case 'button':
        return <ModifySidebarButton />;
      case 'divider':
        return <ModifySidebarDivider />;
      case 'spacer':
        return <ModifySidebarSpacer />;
      case 'link':
        return <ModifySidebarLink />;
      case 'heading':
        return <ModifySidebarHeading />;
      default:
        return (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Settings2 className="size-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Nessun elemento selezionato</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Seleziona un elemento per modificarlo
                </p>
              </div>
            </div>
          </div>
        );
    }
  }, [elementClicked.type]);
  
  return (
    <div className="col-span-1 lg:col-span-1 h-full overflow-y-auto bg-sidebar border-l border-sidebar-border">
      {renderModifySidebar}
    </div>
  );
}

export default ModifySidebar
