<?php

namespace App\Controller;

use App\Entity\CategoryMenu;
use App\Form\CategoryMenuType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryMenuController extends AbstractController
{
    /**
     * @Route("/category_menu", name="app_category_menu")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $categoryMenus = $this->getUser()->getCategoryMenus();

        $categoryMenu = new CategoryMenu();

        $form = $this->createForm(CategoryMenuType::class, $categoryMenu);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $categoryMenu = $form->getData();
            $categoryMenu->setUser($this->getUser());
            $manager->persist($categoryMenu);
            $manager->flush();
            $this->addFlash(
                'success',
                "Categorie d'ingrédient ajouté"
            );
            return $this->redirectToRoute("app_category_menu");
        }

        return $this->render('category_menu/index.html.twig', [
            'controller_name' => 'Menu - Catégories',
            "categoryMenus" => $categoryMenus,
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/category_menu/edit/{id}", name="app_category_menu_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, CategoryMenu $categoryMenu=null): Response
    {        
        if($categoryMenu == null) {
            return new JsonResponse("Category menu doesnt exist");
        }

        if ($categoryMenu->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(CategoryMenuType::class, $categoryMenu);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $categoryMenu = $form->getData();

            $manager->persist($categoryMenu);
            $manager->flush();
            $this->addFlash(
                'success',
                'categorie menu mis à jour'
            );
        }

        return $this->render('category_menu/edit.html.twig', [
            'controller_name' => 'Editer la catégorie des menus',
            "form" => $form->createView(),
            'referer' => $this->generateUrl("app_category_menu"),
        ]);
    }

    /**
     * @Route("/category_menu/remove/{id}", name="app_category_menu_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, CategoryMenu $categoryMenu = null): Response
    {
        if($categoryMenu == null) {
            return new JsonResponse("Table doesnt exist");
        }

        if ($categoryMenu->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($categoryMenu);
        $manager->flush();
        $this->addFlash(
            'success',
            "Catégorie de menu supprimée"
        );
        return $this->redirect($request->headers->get('referer'));
    }
}
