import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import SignIn from '../pages/sign-in/SignIn.jsx';
import {MainLayout} from '../layouts/MainLayout.jsx';

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <ComponentPreview path="/SignIn">
          <SignIn/>
        </ComponentPreview>
        <ComponentPreview path="/MainLayout">
          <MainLayout/>
        </ComponentPreview>
      </Previews>
  );
};

export default ComponentPreviews;