import { Meta, Story } from '@storybook/react';
import { lorem } from 'faker';
import { Factory } from 'fishery';
import React from 'react';
import '../components/TodoList/styles.scss';
import { init } from '../components/TodoList/ToDoList';
import { StorybookHtmlComponent } from './StorybookHtmlComponent';
import toDoListView from './views/components/todo-list.html';

interface StoryArgs {
  numDoing: number;
  numDone: number;
}

export default {
  title: 'HTML Components/To Do List',
  argTypes: {
    numDoing: {
      name: 'Number to simulate in "Doing"',
      type: 'number',
      defaultValue: 5,
      control: {
        type: 'range',
        min: 0,
        max: 10,
      }
    },
    numDone: {
      name: 'Number to simulate in "Done"',
      type: 'number',
      defaultValue: 1,
      control: {
        type: 'range',
        min: 0,
        max: 10,
      }
    }
  },
} as Meta;

const ToDoItemFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  title: `${lorem.words(3)} (#${sequence})`,
}));

const mockDoingItems = ToDoItemFactory.buildList(10);
const mockDoneItems = ToDoItemFactory.buildList(10);

const Template: Story<StoryArgs> = (args) => {
  const view = {
    dataDoing: JSON.stringify(mockDoingItems.slice(0, args.numDoing)),
    dataDone: JSON.stringify(mockDoneItems.slice(0, args.numDone))
  }

  return <StorybookHtmlComponent template={toDoListView} init={init} view={view} />;
}

export const ToDoList = Template.bind({});
