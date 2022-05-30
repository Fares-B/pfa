<?php

namespace App\Controller;

use App\Entity\Establishment;
use App\Entity\Table;
use App\Form\TableType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TableController extends AbstractController
{
    /**
     * @Route("/tables", name="app_tables")
     * @Route("/establishment/{id}/table", name="app_table")
     */
    public function index(Request $request, $id = null, EntityManagerInterface $manager): Response
    {
        $establishment = $manager->getRepository(Establishment::class)->findOneBy(["id" => $id]);
        $tables = null;
        if ($establishment !== null) {
            $tables = $establishment->getTables();
        } else {
            $tables = $this->getUser()->getTables();
        }
        $table = new Table();

        $form = $this->createForm(TableType::class, $table, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $table = $form->getData();

            $manager->persist($table);
            $manager->flush();
            $this->addFlash(
                'success',
                'Table ajouté'
            );
            return $this->redirectToRoute("app_tables");
        }

        return $this->render('table/index.html.twig', [
            'controller_name' => 'Tables',
            "tables" => $tables,
            "establismentName" => $establishment ? $establishment->getName() : null,
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/table/edit/{id}", name="app_table_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, Table $table=null): Response
    {        
        if($table == null) {
            return new JsonResponse("Table doesnt exist");
        }

        if ($table->getEstablishment()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(TableType::class, $table, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $table = $form->getData();

            $manager->persist($table);
            $manager->flush();
            $this->addFlash(
                'success',
                'Etablissement mis à jour'
            );
        }

        return $this->render('table/edit.html.twig', [
            'controller_name' => 'Editer la table',
            "form" => $form->createView(),
            'referer' => $this->generateUrl("app_tables"),
        ]);
    }

    /**
     * @Route("/table/remove/{id}", name="app_table_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, Table $table = null): Response
    {
        if($table == null) {
            return new JsonResponse("Table doesnt exist");
        }

        if ($table->getEstablishment()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($table);
        $manager->flush();
        $this->addFlash(
            'success',
            'Table supprimé'
        );
        return $this->redirect($request->headers->get('referer'));
    }
}


// RESTE à FAIRE CATEGORIE INGREDIENT ET SUITE.
