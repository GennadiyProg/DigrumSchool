import React, {FC} from 'react';
import {CourseMenuItem} from "../Courses.typed";
import {ExpansionPanel} from "../../../components/ExpansionPanel";
import {AppSimpleTable} from "../../../components/AppSimpleTable";


interface SideMenuProps {
  menuItems: CourseMenuItem[],
}

export const SideMenu:FC<SideMenuProps> = ({menuItems}) => {
  return (
    <>
      {menuItems.map(item => (
        <ExpansionPanel key={item.title} title={item.title}>
          <AppSimpleTable headVisible={false} data={item.content}/>
        </ExpansionPanel>
      ))}
    </>
  );
};