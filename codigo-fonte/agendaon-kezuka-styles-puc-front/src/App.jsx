import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './pages/HomePage';
import CadastroColaborador from './pages/CadastroColaborador';
import AtualizarColaborador from './pages/AtualizarColaborador';
import ListaColaboradores from './pages/ListaColaboradores';
import CadastroServico from './pages/CadastroServico';
import AtualizarServico from './pages/AtualizarServico';
import ListaServicos from './pages/ListaServicos';
import CadastroComissoes from './pages/CadastroComissoes';
import ListaComissoes from './pages/ListaComissoes';
import AtualizarComissoes from './pages/AtualizarComissoes';
import CadastroCliente from './pages/CadastroCliente';
import ListaCliente from './pages/ListaCliente';
import ModalLogin from './components/layout/ModalLogin';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <Dashboard />
            </PrivateRoute>} />
          <Route path="/cadastro-colaborador" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <CadastroColaborador />
            </PrivateRoute>} />
          <Route path="/atualizar-colaborador/:id" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <AtualizarColaborador />
            </PrivateRoute>} />
          <Route path="/lista-colaborador" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <ListaColaboradores />
            </PrivateRoute>} />
          <Route path="/cadastro-servico" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <CadastroServico />
            </PrivateRoute>} />
          <Route path="/lista-servico" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <ListaServicos />
            </PrivateRoute>} />
          <Route path="/atualizar-servico/:id" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <AtualizarServico />
            </PrivateRoute>} />
          <Route path="/cadastro-comissao" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <CadastroComissoes />
            </PrivateRoute>} />
          <Route path="/lista-comissao" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <ListaComissoes />
            </PrivateRoute>} />
          <Route path="/atualizar-comissao/:id" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <AtualizarComissoes />
            </PrivateRoute>} />
          <Route path="/lista-cliente" element={
            <PrivateRoute allowedTypes={['Gestor']}>
              <ListaCliente />
            </PrivateRoute>} />       
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/login-modal" element={<ModalLogin />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
