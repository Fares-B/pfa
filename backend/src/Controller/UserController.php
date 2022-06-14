<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

function generateRandomPassword($length=8) {
     $comb = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); 
    $combLen = strlen($comb) - 1; 
    for ($i = 0; $i < $length; $i++) {
        $n = rand(0, $combLen);
        $pass[] = $comb[$n];
    }
    return implode($pass);
}

class UserController extends AbstractController
{
    /**
     * @Route("/users", name="app_users")
     */
    public function index(
        Request $request,
        EntityManagerInterface $manager,
        UserPasswordHasherInterface $passwordHasher,
        \Swift_Mailer $mailer
    ): Response
    {
        $currentUserId = $this->getUser()->getId();
        $users = $manager->getRepository(User::class)->findAllWithRole("ESTABLISHMENT", $currentUserId);

        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();
            $plaintextPassword = generateRandomPassword();

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            $user->setPassword($hashedPassword);
            $user->setRoles(["ROLE_USER", "ROLE_ESTABLISHMENT"]);
            $manager->persist($user);
            $manager->flush();

            // send email with email and password
            $email = new \Swift_Message('Test email');
            $email->setFrom('admin@zetcode.com');
            $email->setTo($user->getEmail());
            $email->setBody(
                $this->renderView(
                    'email/userCreated.html.twig',
                    [
                        'email' => $user->getEmail(),
                        'password' => $plaintextPassword,
                    ]
                ),
                'text/html'
            );

            $mailer->send($email);

            $this->addFlash(
                'success',
                "Utilisateur ajouté"
            );
            return $this->redirectToRoute("app_users");
        }

        return $this->render('user/index.html.twig', [
            'controller_name' => 'Utilisateurs',
            'users' => $users,
            "form" => $form->createView(),
        ]);
    }
}
